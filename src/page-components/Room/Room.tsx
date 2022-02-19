import { AnimatedHighlight } from '@/components/AnimatedHighlight'
import { Box } from '@/components/Box'
import { ExitAnimationable } from '@/components/ExitAnimationable'
import { FullHeightContainer } from '@/components/FullHeightContainer'
import { Label } from '@/components/Label'
import { useInterval } from '@/hooks/useInterval'
import { userAtom } from '@/atoms/user'
import { Player } from '@/types/Player'
import { RoomRes, roomThemeToText } from '@/types/Room'
import axios from 'axios'
import { useAtom } from 'jotai'
import { SuccessApiResponse } from 'next-api-handler'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { Button } from '@/components/Button'
import { Textfield } from '@/components/Textfield'

/**
 * Room props.
 */
export type RoomProps = {}

/**
 * Room component.
 */
export const Room: React.VFC<RoomProps> = (props) => {
  const [room, setRoom] = useState<RoomRes>()
  const [user] = useAtom(userAtom)
  const [player, setPlayer] = useState<Player>()
  const [enemy, setEnemey] = useState<Player>()
  const [modelURL, setModelURL] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>()
  const router = useRouter()
  const roomId = router.query.id

  const fetchRoom = useCallback(async () => {
    if (!roomId) {
      return
    }

    if (!user) {
      return
    }

    try {
      const {
        data: { data: room },
      } = await axios.get<SuccessApiResponse<RoomRes>>(`/api/rooms/${roomId}`)

      setRoom(room)

      if (player) {
        if (player.isHost) {
          setPlayer(room.host)
          setEnemey(room.participant)
        } else {
          setEnemey(room.host)
          setPlayer(room.participant)
        }
      }
    } catch (e) {
      router.push('/lobby')
    }
  }, [roomId, user, router, player])

  const joinRoom = useCallback(async () => {
    if (!roomId) {
      return
    }

    if (!user) {
      return
    }

    try {
      const {
        data: { data },
      } = await axios.post<
        SuccessApiResponse<{ room: RoomRes; player: Player }>
      >(`/api/rooms/${roomId}/join`, {
        userId: user.id,
      })

      setRoom(data.room)
      setPlayer(data.player)
    } catch (e) {
      router.push('/lobby')
    }
  }, [roomId, user, router])

  useEffect(() => {
    fetchRoom().then(joinRoom)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useInterval(() => {
    fetchRoom()
  }, 5000)

  if (!room || !user || !player) {
    return <FullHeightContainer>準備しています...</FullHeightContainer>
  }

  const onReadyClick = async () => {
    setLoading(true)
    setError(undefined)
    try {
      await axios.post(`/api/rooms/${roomId}/model`, {
        userId: user.id,
        roomId,
        modelURL,
      })
      fetchRoom()
    } catch (e) {
      if (axios.isAxiosError(e)) {
        setError(e.message)
      }
    }
    setLoading(false)
  }

  const divider = (
    <Box
      css={{
        margin: '16px',
        border: '1px solid #e0e0e0',
        width: '100%',
        maxWidth: '100px',
      }}
    />
  )

  const gameReady = player.modelURL && enemy?.modelURL

  return (
    <ExitAnimationable>
      <FullHeightContainer>
        <h1>{roomThemeToText(room.theme)}</h1>
        <h2 style={{ color: '#606060', fontSize: '1rem' }}>
          招待コード: {room.id}
        </h2>
        {divider}
        <h3>
          <Label color="red">あなた{player.isHost && '(ホスト)'}</Label>
          {player.name}({player.modelURL ? '準備OK' : '準備中...'})
        </h3>
        <h3>vs</h3>
        <h3>
          {enemy ? (
            <>
              <Label color="blue">対戦相手{enemy.isHost && '(ホスト)'}</Label>
              {enemy.name}({enemy.modelURL ? '準備OK' : '準備中...'})
            </>
          ) : (
            '対戦相手を待っています...'
          )}
        </h3>
        {divider}
        <Box css={{ maxWidth: 500 }}>
          <label>
            Teachable Machine で生成したモデルの URL を入力してね。
            <Textfield
              placeholder="https://teachablemachine.withgoogle.com/models/[...]"
              value={modelURL}
              onChange={(e) => setModelURL(e.target.value)}
              disabled={loading}
            />
          </label>
          <Box css={{ color: '#f44336' }}>{error}</Box>
          <Box css={{ margin: '16px 0' }} />
          <Button
            variant={gameReady ? 'contained' : 'default'}
            css={{ width: '100%' }}
            disabled={loading}
            onClick={onReadyClick}
          >
            {loading ? '読込中...' : player.modelURL ? '更新' : '準備OK?'}
          </Button>
        </Box>
        {gameReady &&
          (player.isHost ? (
            <>
              {divider}
              <Button css={{ width: '100%' }} variant="contained">
                対戦開始
              </Button>
            </>
          ) : (
            <>
              {divider}
              <Box css={{ color: '#2196F3' }}>
                ホストが対戦を開始するまでお待ち下さい...
              </Box>
            </>
          ))}
      </FullHeightContainer>
    </ExitAnimationable>
  )
}

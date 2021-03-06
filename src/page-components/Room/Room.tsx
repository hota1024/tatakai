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
import { HandwrittenNumberGame, JudgeResult, JudgeTurnResult } from '@/tf/Game'

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
  const [wasStarted, setWasStarted] = useState<boolean>()
  const [gaming, setGaming] = useState(false)
  const [judge, setJudge] = useState<JudgeResult>()
  const [isDraw, setIsDraw] = useState(false)
  const [isWin, setIsWin] = useState(false)
  const [judges, setJudges] = useState<JudgeTurnResult[]>([])
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
      setWasStarted(room.wasStarted)

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
    if (wasStarted) {
      ;(async () => {
        setGaming(true)
        if (!enemy || !player) {
          return
        }
        const game = new HandwrittenNumberGame(player, enemy)
        game.onJudgeTurn = (judge) => {
          setJudges((judges) => [...judges, judge])
        }

        const result = await game.judge()
        setIsDraw(result.draw === true)
        setIsWin(result.winner?.isHost === player.isHost)
        setJudge(result)
        console.log(result, player, enemy)

        setGaming(false)
      })()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wasStarted])

  useEffect(() => {
    fetchRoom().then(joinRoom)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useInterval(() => {
    fetchRoom()
  }, 5000)

  if (!room || !user || !player) {
    return <FullHeightContainer>?????????????????????...</FullHeightContainer>
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

  const battleStart = async () => {
    setLoading(true)
    await axios.post(`/api/rooms/${roomId}/start`, {
      userId: user.id,
    })
    setLoading(false)
    setGaming(true)
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
          ???????????????: {room.id}
        </h2>
        {divider}
        <h3>
          <Label color="red">?????????{player.isHost && '(?????????)'}</Label>
          {player.name}({player.modelURL ? '??????OK' : '?????????...'})
        </h3>
        <h3>vs</h3>
        <h3>
          {enemy ? (
            <>
              <Label color="blue">????????????{enemy.isHost && '(?????????)'}</Label>
              {enemy.name}({enemy.modelURL ? '??????OK' : '?????????...'})
            </>
          ) : (
            '?????????????????????????????????...'
          )}
        </h3>
        {divider}
        <Box css={{ maxWidth: 500 }}>
          <label>
            Teachable Machine ??????????????????????????? URL ?????????????????????
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
            variant={gameReady ? 'default' : 'contained'}
            css={{ width: '100%' }}
            disabled={loading}
            onClick={onReadyClick}
          >
            {loading ? '?????????...' : player.modelURL ? '??????' : '??????OK?'}
          </Button>
        </Box>
        {divider}
        {gameReady &&
          (player.isHost ? (
            <Box>
              <Button
                variant="contained"
                disabled={gaming || loading}
                onClick={battleStart}
              >
                {gaming ? '...' : loading ? '???????????????...' : '????????????'}
              </Button>
            </Box>
          ) : (
            <>
              <Box css={{ color: '#2196F3' }}>
                {wasStarted
                  ? '???????????????...'
                  : '?????????????????????????????????????????????????????????...'}
              </Box>
            </>
          ))}
        <p>{judge && (isDraw ? '????????????' : isWin ? '??????' : '??????')}</p>
        <ul>
          {judges.map((judge, key) => (
            <li key={key}>
              <img src={judge.image.image.src} alt={judge.image.label} />
              <span>
                {judge.draw
                  ? '????????????!'
                  : judge.winner?.name +
                    '????????????' +
                    `(${judge.winnerProbability} > ${judge.loserProbability})`}
              </span>
            </li>
          ))}
        </ul>
      </FullHeightContainer>
    </ExitAnimationable>
  )
}

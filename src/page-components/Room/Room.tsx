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
          setEnemey(room.participant)
        } else {
          setEnemey(room.host)
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

  return (
    <ExitAnimationable>
      <FullHeightContainer>
        <h1>{roomThemeToText(room.theme)}</h1>
        <h2 style={{ color: '#606060', fontSize: '1rem' }}>
          招待コード: {room.id}
        </h2>
        <Box
          css={{
            margin: '16px',
            border: '1px solid #e0e0e0',
            width: '100%',
            maxWidth: '100px',
          }}
        />
        <h3>
          <Label color="red">あなた</Label>
          {player.name}
        </h3>
        <h3>vs</h3>
        <h3>
          {enemy ? (
            <>
              <Label color="blue">対戦相手</Label>
              {enemy.name}
            </>
          ) : (
            '対戦相手を待っています...'
          )}
        </h3>
      </FullHeightContainer>
    </ExitAnimationable>
  )
}

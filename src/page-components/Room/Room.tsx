import { ExitAnimationable } from '@/components/ExitAnimationable'
import { FullHeightContainer } from '@/components/FullHeightContainer'
import { RoomRes } from '@/types/Room'
import axios from 'axios'
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
  const router = useRouter()
  const roomId = router.query.id

  const fetchRoom = useCallback(async () => {
    if (!roomId) {
      return
    }

    try {
      const {
        data: { data: room },
      } = await axios.get<SuccessApiResponse<RoomRes>>(`/api/rooms/${roomId}`)

      setRoom(room)
    } catch (e) {
      router.push('/lobby')
    }
  }, [roomId, router])

  useEffect(() => {
    fetchRoom()
  }, [fetchRoom])

  if (!room) {
    return <FullHeightContainer>準備しています...</FullHeightContainer>
  }

  return (
    <ExitAnimationable>
      <FullHeightContainer></FullHeightContainer>
    </ExitAnimationable>
  )
}

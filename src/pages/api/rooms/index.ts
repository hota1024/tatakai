import { genRoomRes, Room } from '@/types/Room'
import { BadRequestException, RouterBuilder } from 'next-api-handler'
import { createRoom } from './rooms.service'

const router = new RouterBuilder()

router.post((req) => {
  const room = createRoom(req.body)

  return genRoomRes(room)
})

router.get(() => {
  return []
})

export default router.build()

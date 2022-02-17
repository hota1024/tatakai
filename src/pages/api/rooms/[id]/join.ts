import { genRoomRes } from '@/types/Room'
import { BadRequestException, RouterBuilder } from 'next-api-handler'
import { joinRoom } from '../rooms.service'

const router = new RouterBuilder()

router.post((req) => {
  if (typeof req.query.id !== 'string') {
    throw new BadRequestException('正しいidを指定してください')
  }

  if (typeof req.body.userId !== 'string') {
    throw new BadRequestException('正しいuserIdを指定してください')
  }

  const { room, player } = joinRoom(req.query.id, req.body.userId)

  return { room: genRoomRes(room), player }
})

export default router.build()

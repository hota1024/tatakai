import { BadRequestException, RouterBuilder } from 'next-api-handler'
import { findRoomOrThrow } from '../rooms.service'

const router = new RouterBuilder()

router.get((req) => {
  if (typeof req.query.id !== 'string') {
    throw new BadRequestException('正しいidを指定してください')
  }

  return findRoomOrThrow(req.query.id)
})

export default router.build()

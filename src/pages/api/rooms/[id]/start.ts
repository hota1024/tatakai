import { BadRequestException, RouterBuilder } from 'next-api-handler'
import { startRoomBattle } from '../rooms.service'

const router = new RouterBuilder()

router.post((req) => {
  if (typeof req.query.id !== 'string') {
    throw new BadRequestException('正しいidを指定してください')
  }

  if (typeof req.body.userId !== 'string') {
    throw new BadRequestException('正しいuserIdを指定してください')
  }

  startRoomBattle(req.query.id, req.body.userId)
})

export default router.build()

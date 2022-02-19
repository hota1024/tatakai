import { BadRequestException, RouterBuilder } from 'next-api-handler'
import { setPlayerModel, validateModelURL } from '../rooms.service'

const router = new RouterBuilder()

router.post(async (req) => {
  if (typeof req.query.id !== 'string') {
    throw new BadRequestException('正しいidを指定してください')
  }

  if (typeof req.body.userId !== 'string') {
    throw new BadRequestException('正しいuserIdを指定してください')
  }

  if (typeof req.body.modelURL !== 'string') {
    throw new BadRequestException('正しいmodelURLを指定してください')
  }

  await validateModelURL(req.body.modelURL)

  setPlayerModel(req.query.id, req.body.userId, req.body.modelURL)
})

export default router.build()

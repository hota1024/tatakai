import { BadRequestException, RouterBuilder } from 'next-api-handler'
import { pingUser } from '../users.service'

const router = new RouterBuilder()

router.post((req) => {
  const id = req.query.id

  if (typeof id !== 'string') {
    throw new BadRequestException('idが正しくありません')
  }

  pingUser(id)
})

export default router.build()

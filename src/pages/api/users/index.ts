import { randomName } from '@/utils/randomName'
import { RouterBuilder } from 'next-api-handler'
import { createUser } from './users.service'

// controller
const router = new RouterBuilder()

router.post((req) => {
  const name = req.body.name ?? randomName()

  return createUser(name)
})

export default router.build()

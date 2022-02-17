import { Room } from '@/types/Room'
import { BadRequestException, RouterBuilder } from 'next-api-handler'

const rooms: Room[] = []
const router = new RouterBuilder()

router.post((req) => {
  const body = req.body as Room

  if (!body.theme || body.theme !== 'handwritten-numbers') {
    // handwritten-numbers 以外は準備中。手書き数字のみ。
    throw new BadRequestException('お題を選んでください')
  }

  if (typeof body.isPublic !== 'boolean' || body.isPublic) {
    // 誰でもOKは準備中。友達限定のみ。
    throw new BadRequestException('公開設定をしてください')
  }

  let id: string

  do {
    id = [...Array(6)].map(() => Math.floor(Math.random() * 10)).join('')
  } while (rooms.find((room) => room.id === id))

  return {
    ...body,
    id,
  }
})

router.get(() => {
  return []
})

export default router.build()

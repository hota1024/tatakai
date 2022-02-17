import { User } from '@/types/User'
import { randomName } from '@/utils/randomName'
import { NotFoundException, BadRequestException } from 'next-api-handler'
import { v4 } from 'uuid'

// service
let users: User[] = []

export const findUserOrThrow = (id: string) => {
  const user = users.find((user) => user.id === id)

  if (!user) {
    throw new NotFoundException('ユーザが見つかりませんでした')
  }

  return user
}

export const updateUser = (id: string, data: Partial<User>) => {
  const user = findUserOrThrow(id)
  const { name, lastPingAt } = data

  Object.assign(user, { name, lastPingAt })

  return user
}

export const createUser = (name: string) => {
  if (typeof name !== 'string') {
    throw new BadRequestException('名前が正しくありません')
  }

  const user: User = {
    id: v4(),
    name,
    createdAt: Date.now(),
    lastPingAt: Date.now(),
  }

  users.push(user)

  return user
}

export const pingUser = (id: string) => {
  updateUser(id, { lastPingAt: Date.now() })
}

setInterval(() => {
  const lifetime = 60000

  users = users.filter((user) => Date.now() - user.lastPingAt < lifetime)
}, 1000)

import { Room } from '@/types/Room'
import { BadRequestException, NotFoundException } from 'next-api-handler'

const rooms: Room[] = []

export const findRoomOrThrow = (id: string) => {
  const room = rooms.find((room) => room.id === id)

  if (!room) {
    throw new NotFoundException('部屋が見つかりませんでした')
  }

  return room
}

export const createRoom = (data: Omit<Room, 'id' | 'createdAt'>) => {
  if (!data.theme || data.theme !== 'handwritten-numbers') {
    // handwritten-numbers 以外は準備中。手書き数字のみ。
    throw new BadRequestException('お題を選んでください')
  }

  if (typeof data.isPublic !== 'boolean' || data.isPublic) {
    // 誰でもOKは準備中。友達限定のみ。
    throw new BadRequestException('公開設定をしてください')
  }

  const room: Room = {
    ...data,
    createdAt: Date.now(),
    id: genId(),
  }

  rooms.push(room)

  return room
}

const genId = () => {
  let id: string

  do {
    id = [...Array(6)].map(() => Math.floor(Math.random() * 10)).join('')
  } while (rooms.find((room) => room.id === id))

  return id
}
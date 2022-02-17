import { Player } from './Player'
import { User } from './User'

export const roomThemes = ['handwritten-numbers', 'cats-and-dogs'] as const

/**
 * RoomTheme type.
 */
export type RoomTheme = 'handwritten-numbers' | 'cats-and-dogs'

/**
 * Room type.
 */
export type Room = {
  id: string
  theme: RoomTheme
  isPublic: boolean
  createdAt: number
  host?: Player
  participant?: Player
  hostId: User['id']
  participantId: User['id']
}

export const roomThemeToText = (theme: RoomTheme) => {
  if (theme === 'cats-and-dogs') {
    return 'イヌ?ネコ?'
  }

  if (theme === 'handwritten-numbers') {
    return '手書き数字'
  }

  return ''
}

/**
 * RoomRes type.
 */
export type RoomRes = Omit<Room, 'hostId' | 'participantId'>

export const genRoomRes = (room: Room): RoomRes => {
  const { hostId, participantId, ...rest } = room

  return rest
}

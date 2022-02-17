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
  hostId: User['id']
  participantId: User['id']
}

/**
 * RoomRes type.
 */
export type RoomRes = Omit<Room, 'hostId' | 'participantId'>

export const genRoomRes = (room: Room): RoomRes => {
  const { hostId, participantId, ...rest } = room

  return rest
}

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
}

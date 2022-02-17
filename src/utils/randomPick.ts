/**
 * random pick.
 *
 * @param array array.
 */
export const randomPick = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)]
}

import { nanoid } from 'nanoid'

export function createId(size?: number) {
  return nanoid(size || 8)
}
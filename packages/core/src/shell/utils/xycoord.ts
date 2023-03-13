import { IXYCoord } from "../../interfaces"

export function getPosition(e: { clientX: number, clientY: number }): IXYCoord {
  return {
    x: e.clientX,
    y: e.clientY
  }
}

export function getOffset(e: { offsetX: number, offsetY: number }): IXYCoord {
  return {
    x: e.offsetX,
    y: e.offsetY
  }
} 
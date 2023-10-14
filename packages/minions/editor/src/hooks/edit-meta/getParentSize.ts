import { Node } from "@antv/x6"
import { GroupSize } from "../useGetGroupNodeConfig"

export function getParentSize(node: Node) {
  const children = node.getChildren()
  if (children && children.length) {
    node.prop('originPosition', node.getPosition())
  }

  const parent = node.getParent()
  if (parent && parent.isNode()) {
    let originSize = parent.prop('originSize')
    if (originSize == null) {
      originSize = parent.getSize()
      parent.prop('originSize', GroupSize)
    }

    let originPosition = parent.prop('originPosition')
    if (originPosition == null) {
      originPosition = parent.getPosition()
      parent.prop('originPosition', originPosition)
    }

    let x = originPosition.x + 10
    let y = originPosition.y + 10
    let cornerX = originPosition.x + originSize.width
    let cornerY = originPosition.y + originSize.height
    let hasChange = false

    const children = parent.getChildren()
    if (children) {
      children.filter(child => child.isNode()).forEach((child) => {
        const bbox = child.getBBox().inflate(40)
        const corner = bbox.getCorner()

        if (bbox.x < x) {
          x = bbox.x
          hasChange = true
        }

        if (bbox.y < y) {
          y = bbox.y
          hasChange = true
        }

        if (corner.x > cornerX) {
          cornerX = corner.x
          hasChange = true
        }

        if (corner.y > cornerY) {
          cornerY = corner.y
          hasChange = true
        }
      })
    }

    if (hasChange) {
      return { position: { x, y }, size: { width: cornerX - x + 30, height: cornerY - y } }
    }
  }
}
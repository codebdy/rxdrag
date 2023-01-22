import { memo } from "react"
import { useAddEdge } from "../hooks/edit-meta/useAddEdge"
import { useAddNode } from "../hooks/edit-meta/useAddNode"
import { useMovedNode } from "../hooks/edit-meta/useMovedNode"
import { useArrowhead } from "../hooks/useArrowhead"
import { useShowCells } from "../hooks/useShowCells"
import { useTraceLining } from "../hooks/useTraceLining"

export const Logic = memo(()=>{
  useShowCells()
  useTraceLining()
  useAddNode()
  useAddEdge()
  useMovedNode()
  useArrowhead()
  return null
})
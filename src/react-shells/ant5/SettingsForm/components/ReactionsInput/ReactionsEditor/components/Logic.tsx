import { memo } from "react"
import { useAddEdge } from "../hooks/edit-meta/useAddEdge"
import { useAddNode } from "../hooks/edit-meta/useAddNode"
import { useChangeNode } from "../hooks/edit-meta/useChangeNode"
import { useShowCells } from "../hooks/useShowCells"
import { useTraceLining } from "../hooks/useTraceLining"

export const Logic = memo(()=>{
  useShowCells()
  useTraceLining()
  useAddNode()
  useAddEdge()
  useChangeNode()
  return null
})
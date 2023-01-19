import { memo } from "react"
import { useShowCells } from "../hooks/useShowCells"
import { useTraceLining } from "../hooks/useTraceLining"

export const Logic = memo(()=>{
  useShowCells()
  useTraceLining()
  return null
})
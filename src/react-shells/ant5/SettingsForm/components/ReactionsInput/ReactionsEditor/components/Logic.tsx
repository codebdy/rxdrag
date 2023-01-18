import { memo } from "react"
import { useNodesShow } from "../hooks/useShowNodes"
import { useTraceLining } from "../hooks/useTraceLining"

export const Logic = memo(()=>{
  useNodesShow()
  useTraceLining()
  return null
})
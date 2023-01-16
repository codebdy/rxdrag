import { memo } from "react"
import { useNodesShow } from "./hooks/useShowNodes"

export const Logic = memo(()=>{
  useNodesShow()
  return null
})
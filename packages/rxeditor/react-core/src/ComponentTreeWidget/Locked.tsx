import React from "react"
import { LockContext } from "../contexts"
import { ITreeNode } from "@rxdrag/core"
import { memo } from "react"

export const Locked = memo((
  props: {
    node: ITreeNode,
    children?: React.ReactNode
  }
) => {
  const { node, children } = props
  return (
    node.meta.locked ?
      <LockContext.Provider value={node.meta.locked}>
        {children}
      </LockContext.Provider>
      : <>{children}</>
  )
})
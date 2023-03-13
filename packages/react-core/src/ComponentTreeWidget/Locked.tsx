import { LockContext } from "core-react/contexts"
import { ITreeNode } from "core/interfaces"
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
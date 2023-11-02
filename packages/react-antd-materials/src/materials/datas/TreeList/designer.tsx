import { TreeList, TreeListProps } from "@rxdrag/react-antd-components"
import React, { ForwardedRef, forwardRef } from "react"

export const TreeListDesigner = forwardRef((
  props: TreeListProps,
  ref: ForwardedRef<HTMLDivElement>
) => {
  return <TreeList ref={ref} {...props} />
})
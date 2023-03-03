import { forwardRefByChildren } from "core-react/hocs/forwardRefByChildren"
import { memo } from "react"

const TableColumnDesignerImpl = memo((
  props: {
    children?: React.ReactNode,
  },

) => {
  const { children } = props
  return (
    <>
      {children}
    </>
  )
})

export const TableColumnDesigner = forwardRefByChildren(TableColumnDesignerImpl)
import { forwardRefByChildren } from "@rxdrag/react-core"
import { memo } from "react"
import { ReactComponent } from "@rxdrag/react-shared"

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

export const TableColumnDesigner: ReactComponent = forwardRefByChildren(TableColumnDesignerImpl)
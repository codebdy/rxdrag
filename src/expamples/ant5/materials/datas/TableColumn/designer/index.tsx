import { switchRef } from "core-react/switchRef"
import { forwardRef, memo } from "react"

const TableColumnDesignerImpl = memo(forwardRef<HTMLDivElement>((
  props: {
    children?: React.ReactNode,
  },
  ref
) => {
  const { children } = props
  return (
    <>
      {children}
      <div ref={ref} style={{ display: 'none' }}></div>
    </>
  )
}))

export const TableColumnDesigner = switchRef(TableColumnDesignerImpl, element => element?.parentElement)
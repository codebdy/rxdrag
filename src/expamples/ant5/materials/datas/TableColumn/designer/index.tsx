import { RxProps } from "core"
import { memo, useCallback } from "react"

export const TableColumnDesigner = memo((
  props: RxProps & {
    children?: React.ReactNode,
  }
) => {
  const { children, ...other } = props
  const handleRefChange = useCallback((ele: HTMLDivElement | null) => {
    if (ele) {
      for (const key of Object.keys(other)) {
        ele.parentElement?.setAttribute(key, (other as any)[key])
      }
    }
  }, [other])
  return (
    <div ref={handleRefChange}>
      {children}
    </div>
  )
})

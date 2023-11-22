import React, { forwardRef, memo } from "react"
import cls from "classnames"
export const TabPanel = memo(forwardRef<HTMLDivElement>((
  props: {
    title?: string,
    className?: string,
    isField?: boolean,
    children?: React.ReactNode
  },
  ref
) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { className, children, isField, title, ...other } = props
  return (
    <div ref={ref} {...other} className={cls("rx-tab-panel", className)}>
      {children}
    </div>
  )
}))
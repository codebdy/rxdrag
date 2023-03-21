import React, { memo } from "react"

export const RightSidebar = memo((
  props: {
    children?: React.ReactNode
  }
) => {
  const { children, ...other } = props;
  return (
    <div {...other}>
      {children}
    </div>
  )
})
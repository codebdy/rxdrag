import React, { memo } from "react"

export const LocalesRoot = memo((
  props: {
    children?: React.ReactNode
  }
) => {
  const { children } = props
  return (
    <>
      {children}
    </>
  )
})
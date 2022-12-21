import React, { memo } from "react"

export const NormalFieldController = memo((props: {
  children?: React.ReactNode
}) => {
  const { children } = props
  return (
    <>
      {children}
    </>
  )
})
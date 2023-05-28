import { memo } from "react"

export const MinionsRoot = memo((
  props: {
    children?: React.ReactNode
  }
) => {
  const { children } = props;
  return (
    <>
      {children}
    </>
  )
})
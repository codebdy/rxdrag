import { memo } from "react"

export const DefaultSlot = memo((
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
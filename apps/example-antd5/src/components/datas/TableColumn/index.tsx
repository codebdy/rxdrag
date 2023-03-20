import { memo } from "react"

export const TableColumn = memo((
  props: {
    children?: React.ReactNode,
  },
)=>{
  const { children } = props
  return (
    <>
      {children}
    </>
  )
})
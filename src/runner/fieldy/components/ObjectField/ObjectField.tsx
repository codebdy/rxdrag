import { memo } from "react"

//动态增加字段用这个，否则不要碰它
export const ObjectField = memo((
  props: {
    name: string,
    value?: any,
    children?: React.ReactNode
  }
) => {
  const { name, value, children } = props
  return (
    <>
      {children}
    </>
  )
})
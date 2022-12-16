import { forwardRef, memo } from "react"
import { Button as AntdButton, ButtonProps } from "antd"

export const Button = memo(forwardRef<HTMLDivElement>((
  props: ButtonProps & {
    title?: string,
    children?: React.ReactNode
  },
  ref
) => {
  const { title, children, ...other } = props
  return (
    <AntdButton ref={ref} {...other}>
      {
        title
      }
      {
        children
      }
    </AntdButton>
  )
}))
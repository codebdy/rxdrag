import { forwardRef, memo } from "react"
import { Button as AntdButton, ButtonProps } from "antd"
import { IIcon } from "./IconView/model"
import { IconView } from "./IconView"

export const Button = memo(forwardRef<HTMLDivElement>((
  props: ButtonProps & {
    icon?: IIcon,
    title?: string,
    children?: React.ReactNode
  },
  ref
) => {
  const { title, children, icon, ...other } = props
  return (
    <AntdButton
      ref={ref}
      icon={icon && <IconView icon={icon} />}
      {...other}
    >
      {
        title
      }
      {
        children
      }
    </AntdButton>
  )
}))
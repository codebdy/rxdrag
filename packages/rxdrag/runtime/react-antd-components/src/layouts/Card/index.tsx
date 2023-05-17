import { Card as AntdCard } from "antd"
import { forwardRef, memo } from "react"

export const Card = memo(forwardRef<HTMLDivElement>((props: any, ref) => {
  const { actions, ...other } = props;
  return (
    <AntdCard ref={ref} actions={actions ? [actions] : undefined} {...other} />
  )
}))
import { Button } from "antd"
import { memo } from "react"

export const FunctionsInput = memo((props: {
  title: string
}) => {
  const { title, ...other } = props;
  return (
    <Button {...other}>{title}</Button>
  )
})
import { Button } from "antd";
import { memo } from "react"

export const NavButton = memo((
  props: {
    title?: string,
    icon?: React.ReactNode,
    name: string,
  }
) => {
  const { title, icon, name } = props;
  return (
    <Button type="text" icon={icon}>{title}</Button>
  )
})
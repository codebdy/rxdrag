import { UserOutlined } from "@ant-design/icons"
import { Avatar } from "antd"
import { forwardRef, memo, CSSProperties } from "react"
import { Trigger } from "../Trigger"
import { HeaderInner } from "./HeaderInner"

export type HeaderProps = {
  style?: CSSProperties
  hasTrigger?: boolean
  isDark?: boolean
}

export const Header = memo(forwardRef<HTMLDivElement, HeaderProps>((
  props, ref) => {
  const { hasTrigger = true, isDark, ...other } = props;

  return (
    <HeaderInner
      ref={ref}
      {...other}
    >
      {hasTrigger && <Trigger />}
      <div style={{ flex: 1 }}></div>
      <Avatar icon={<UserOutlined />} />
    </HeaderInner>
  )
}))
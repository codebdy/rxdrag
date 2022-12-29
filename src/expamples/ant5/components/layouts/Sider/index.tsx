import { ConfigProvider, Layout, theme } from "antd"
import { forwardRef, memo } from "react"
import { useLayoutParams } from "../context"
import { Trigger } from "../Trigger"

const { Sider: AntdSider, } = Layout

export type SiderProps = {
  dark?: boolean
  hasTrigger?: boolean
  children?: React.ReactNode
}

export const Sider = memo(forwardRef<HTMLDivElement, SiderProps>((
  props, ref) => {
  const { hasTrigger, dark = true, children, ...other } = props;
  const { collapsed } = useLayoutParams() || {}
  return (
    <ConfigProvider
      theme={{
        algorithm: dark ? theme.darkAlgorithm : theme.defaultAlgorithm
      }}
    >
      <AntdSider
        ref={ref}
        trigger={hasTrigger ? <Trigger /> : null}
        collapsible
        collapsed={collapsed}
        {...other}
      >
        {children}
      </AntdSider>
    </ConfigProvider>
  )
}))
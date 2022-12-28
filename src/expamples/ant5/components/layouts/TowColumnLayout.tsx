import { Layout } from "antd"
import React, { useMemo } from "react"
import { forwardRef, memo, useState } from "react"
import { LayoutContext } from "../ProLayout/context"
import { SiderBar } from "../ProLayout/SiderBar"
import { Topbar } from "../ProLayout/Topbar"

const { Content, Footer } = Layout
export interface ProLayoutProps {
  sider?: React.ReactElement<typeof SiderBar>
  header?: React.ReactElement<typeof Topbar>
  footer?: React.ReactElement<typeof Footer>
  content?: React.ReactElement<typeof Content>
}

export const TwoColumnLayout = memo(forwardRef<HTMLDivElement, ProLayoutProps>((
  props, ref) => {
  const { sider, header, footer, content } = props
  const [collapsed, setCollapsed] = useState<boolean>();

  const params = useMemo(() => {
    return {
      collapsed,
      setCollapsed
    }
  }, [collapsed])

  return (
    <LayoutContext.Provider value={params}>
      <Layout>
        {sider}
        <Layout>
          {header}
          {content}
          {footer}
        </Layout>
      </Layout>
    </LayoutContext.Provider>
  )
}))
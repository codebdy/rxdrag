import { Layout } from "antd"
import React, { useMemo } from "react"
import { forwardRef, memo, useState } from "react"
import { LayoutContext } from "./context"
import { Sider } from "./Sider"
import { Header } from "./Header"

const { Content, Footer } = Layout
export interface ProLayoutProps {
  sider?: React.ReactElement<typeof Sider>
  header?: React.ReactElement<typeof Header>
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
      <Layout ref={ref}>
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
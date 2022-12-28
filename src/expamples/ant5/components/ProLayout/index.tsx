import { Layout } from "antd"
import { forwardRef, memo } from "react"

const { Header, Sider, Content, Footer } = Layout
export interface ProLayoutProps {
  header?: React.ReactElement<typeof Header>
  footer?: React.ReactElement<typeof Footer>
  content?: React.ReactElement<typeof Content>
}

export const ProLayout = memo(forwardRef<HTMLDivElement, ProLayoutProps>((
  props, ref) => {
  return (
    <Layout ref={ref} style={{ minHeight: "100%", flex:1 }}>
      <Header style={{ position: 'sticky', top: 0, zIndex: 1, width: '100%', color: "#fff", }}>header</Header>
      <Layout >
        <Sider style={{ color: "#fff" }}>left sidebar</Sider>
        <Content>main content</Content>
        <Sider style={{ color: "#fff" }}>right sidebar</Sider>
      </Layout>
      <Footer>footer</Footer>
    </Layout>
  )
}))
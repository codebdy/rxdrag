import { Layout } from "antd";
import { memo } from "react"
const { Header, Footer, Content } = Layout;

/**
 * HeaderContentFooter layout
 */
export const HCFLayout = memo((props: {
  header?: React.ReactElement<typeof Header>
  footer?: React.ReactElement<typeof Footer>
  children?: React.ReactNode
}) => {
  const { header, footer, children } = props
  return (
    <Layout>
      {header}
      <Content>
        {children}
      </Content>
      {footer}
    </Layout>
  )
})
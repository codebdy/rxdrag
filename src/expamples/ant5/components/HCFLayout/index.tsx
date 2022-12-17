import { Layout } from "antd";
import { forwardRef, memo } from "react"
const { Header, Footer, Content } = Layout;

export interface HCFLayoutProps{
  header?: React.ReactElement<typeof Header>
  footer?: React.ReactElement<typeof Footer>
  children?: React.ReactNode
}
/**
 * HeaderContentFooter layout
 */
export const HCFLayout = memo(forwardRef<HTMLDivElement, HCFLayoutProps>((
  props, ref) => {
  const { header, footer, children } = props
  return (
    <Layout ref={ref}>
      {header}
      <Content>
        {children}
      </Content>
      {footer}
    </Layout>
  )
}))
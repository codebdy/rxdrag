import { Layout } from "antd";
import { forwardRef, memo } from "react"
const { Header, Footer, Content } = Layout;

export interface HCFLayoutProps {
  header?: React.ReactElement<typeof Header>
  footer?: React.ReactElement<typeof Footer>
  content?: React.ReactElement<typeof Content>
}
/**
 * HeaderContentFooter layout
 */
export const HCFLayout = memo(forwardRef<HTMLDivElement, HCFLayoutProps>((
  props, ref) => {
  const { header, footer, content } = props
  return (
    <Layout ref={ref}>
      {header}
      {content}
      {footer}
    </Layout>
  )
}))
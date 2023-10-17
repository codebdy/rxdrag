import { Page, PageProps } from "@rxdrag/react-antd-components"
import { Canvas } from "@rxdrag/react-core"

export const PageCanvas = (props: PageProps) => {
  return (
    <Page {...props}>
      <Canvas />
    </Page>
  )
}

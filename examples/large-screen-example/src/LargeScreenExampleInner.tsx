import { memo } from "react"
import { Toolbar } from "./Toolbar"
import { ZoomableEditor } from "@rxdrag/react-antd-shell"
import styled from "styled-components"
import { LeftSide } from "./LeftSide"
import { LeftSideSecondary } from "./LeftSideSecondary"
import { INodeSchema, IDocumentSchema } from "@rxdrag/schema"

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-flow: column;
  box-sizing: border-box;
  background-color: ${props => props.theme.token?.colorBgContainer};
  color: ${props => props.theme.token?.colorText};
`

const rootNodeSchema: INodeSchema = {
  componentName: "Page"
}

const schemas: IDocumentSchema[] = [
  {
    title: "首页",
    schema: rootNodeSchema,
  },
  {
    title: "详情",
    schema: rootNodeSchema,
  }
]


export const LargeScreenExampleInner = memo((
  props: {
    canvasUrl: string,
    previewUrl: string,
  }
) => {
  const { canvasUrl, previewUrl } = props;
  return (
    <Container className="zoomable-editor">
      <Toolbar />
      <ZoomableEditor
        canvasUrl={canvasUrl}
        previewUrl={previewUrl}
        schemas={schemas}
      />
      <LeftSide />
      <LeftSideSecondary />
    </Container>
  )
})
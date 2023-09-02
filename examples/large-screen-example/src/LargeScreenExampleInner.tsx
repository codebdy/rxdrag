import { memo } from "react"
import { Toolbar } from "./Toolbar"
import { ZoomableEditor } from "@rxdrag/react-antd-shell"
import styled from "styled-components"
import { INodeSchema, IDocumentSchema } from "@rxdrag/schema"
import { LeftSide } from "./LeftSide"
import { ResourceWidget } from "./ResourceWidget"

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-flow: column;
  box-sizing: border-box;
  background-color: ${props => props.theme.token?.colorBgContainer};
  color: ${props => props.theme.token?.colorText};
`

//设备端的编辑区
const AppDeviceArea = styled.div`
  flex:1;
  display: flex;
  height: 0;
`
const rootNodeSchema: INodeSchema = {
  componentName: "Page"
}

const schemas: IDocumentSchema[] = [
  {
    title: "首页",
    schema: rootNodeSchema,
  },
]


export const LargeScreenExampleInner = memo(() => {

  return (
    <Container className="zoomable-editor">
      <Toolbar />
      <AppDeviceArea>
        <LeftSide />
        <ZoomableEditor
          toolbox={<ResourceWidget />}
          schemas={schemas}
        />
      </AppDeviceArea>
    </Container>
  )
})
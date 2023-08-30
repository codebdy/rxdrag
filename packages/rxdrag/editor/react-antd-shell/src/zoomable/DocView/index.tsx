import { memo } from "react"
import styled from "styled-components"
import { DeleteOutlined } from "@ant-design/icons"
import { Button, Space } from "antd"
import { Spring } from "../../common"
import { IDocument } from "@rxdrag/core"

const DocViewContainer = styled.div`
  position: relative;
  width: 1200px;
  .actions{
    display: none;
  }

  &:hover{
    .canvas-content{
      outline: solid 1px ${props => props.theme.token?.colorPrimary};
    }
    .actions{
      display: flex;
    }
  }
`

const CanvasToolbar = styled.div`
  display: flex;
  height: 32px;
  padding: 0px;
  color: ${props => props.theme.token?.colorText};
  //border-bottom: solid 1px ${props => props.theme.token?.colorBorder};
  //background-color: ${props => props.theme.token?.colorBorderSecondary};
  align-items: center;
`

const CanvasContent = styled.div`
  width: 1200px;
  height: 600px;
  background-color: white;
`

const CanvasTitle = styled.span`
  color:${props => props.theme.token?.colorTextSecondary};
  font-size: 13px;
`

export const DocView = memo((
  props: {
    doc: IDocument
  }
) => {
  const { doc } = props
  return (
    <DocViewContainer>
      <CanvasToolbar>
        <CanvasTitle>
          {doc.getTitle()} - <em>大屏</em>
        </CanvasTitle>
        <Spring />
        <Space className="actions">
          <Button type="text" size="small" shape="circle" icon={<DeleteOutlined />} />
        </Space>
      </CanvasToolbar>
      <CanvasContent className="canvas-content" />
    </DocViewContainer>
  )
})
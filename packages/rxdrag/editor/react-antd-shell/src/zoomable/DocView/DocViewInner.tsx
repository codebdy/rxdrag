import { memo } from "react"
import styled from "styled-components"
import { Space } from "antd"
import { Spring, useCanvasUrl } from "../../common"
import { IFrame, useDocument } from "@rxdrag/react-core"

const DocViewContainer = styled.div`
  position: relative;
  width: 800px;
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
  width: 100%;
  height: 600px;
  background-color: white;
`

const CanvasTitle = styled.span`
  color:${props => props.theme.token?.colorTextSecondary};
  font-size: 13px;
`

export const DocViewInner = memo(() => {
  const doc = useDocument()
  const canvasUrl = useCanvasUrl()
  return (
    <DocViewContainer>
      <CanvasToolbar>
        <CanvasTitle>
          {doc?.getTitle()}
        </CanvasTitle>
        <Spring />
        <Space className="actions">
          {/* <Button type="text" size="small" shape="circle" icon={<DeleteOutlined />} /> */}
        </Space>
      </CanvasToolbar>
      <CanvasContent className="document-content" >
        {doc && <IFrame doc={doc} src={canvasUrl} />}
      </CanvasContent>
    </DocViewContainer>
  )
})
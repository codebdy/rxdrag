import { Space, Button, Divider } from "antd"
import { memo } from "react"
import styled from "styled-components"
import { CodeOutlined, FormOutlined, PlayCircleOutlined, RedoOutlined, UndoOutlined } from "@ant-design/icons"
import { Spring } from "../../../common"
import { SvgIcon } from "../../../common/SvgIcon"
import { jsonIcon } from "../../../icons"

const CanvasViewContainer = styled.div`
  width: 500px;
  height: 600px;
  display: flex;
  flex-flow: column;
  background-color: ${props => props.theme.token?.colorBgBase};
  border: solid 1px ${props => props.theme.token?.colorBorder};
  border-radius: 8px;
  overflow: hidden;
`

const CanvasToolbar = styled.div`
  display: flex;
  height: 40px;
  padding: 0 8px;
  color: ${props => props.theme.token?.colorText};
  border-bottom: solid 1px ${props => props.theme.token?.colorBorder};
  background-color: ${props => props.theme.token?.colorBorderSecondary};
  align-items: center;
`

const CanvasContent = styled.div`
  flex: 1;
  width: 100%;
  background-color: white;
`

const CanvasButton = styled(Button).attrs({})`
  
`

export const CanvasView = memo((

) => {
  return (
    <CanvasViewContainer>
      <CanvasToolbar>
        <Space>
          <CanvasButton type="text" icon={<UndoOutlined />} />
          <CanvasButton type="text" icon={<RedoOutlined />} />
          <Divider type="vertical" />
        </Space>
        <Spring />
        <Space>
          <CanvasButton type="text" icon={<FormOutlined />} />
          <CanvasButton type="text"
            icon={<SvgIcon>{jsonIcon}</SvgIcon>
            }
          />
          <CanvasButton type="text" icon={<PlayCircleOutlined />} />
        </Space>
      </CanvasToolbar>
      <CanvasContent />
    </CanvasViewContainer>
  )
})
import { Space, Button, Divider } from "antd"
import { memo } from "react"
import styled from "styled-components"
import { FormOutlined, PlayCircleOutlined, RedoOutlined, UndoOutlined } from "@ant-design/icons"
import { Spring } from "../../../common"
import { SvgIcon } from "../../../common/SvgIcon"
import { jsonIcon } from "../../../icons"

const CanvasViewContainer = styled.div`
  position: relative;
  width: 500px;
  //background-color: ${props => props.theme.token?.colorBgBase};
  //border: solid 1px ${props => props.theme.token?.colorBorder};
  //border-radius: 8px;
  //overflow: hidden;
`

const CanvasToolbar = styled.div`
  display: flex;
  height: 32px;
  padding: 4px 0px;
  color: ${props => props.theme.token?.colorText};
  //border-bottom: solid 1px ${props => props.theme.token?.colorBorder};
  //background-color: ${props => props.theme.token?.colorBorderSecondary};
  align-items: flex-end;
`

const CanvasContent = styled.div`
  width: 500px;
  height: 600px;
  background-color: white;
`

const CanvasTitle = styled.span`
  color:${props => props.theme.token?.colorTextSecondary};
  font-size: 13px;
`

const CanvasButton = styled(Button).attrs({})`
  
`

export const CanvasView = memo((

) => {
  return (
    <CanvasViewContainer>
      <CanvasToolbar>
        <CanvasTitle>
          主场景 - <em>大屏排版布局</em>
        </CanvasTitle>
        <Spring />
        <Space>
          <CanvasButton icon={<UndoOutlined />} />
          <CanvasButton icon={<RedoOutlined />} />
          <Divider type="vertical" />
          <CanvasButton icon={<FormOutlined />} />
          <CanvasButton
            icon={<SvgIcon>{jsonIcon}</SvgIcon>
            }
          />
          <CanvasButton icon={<PlayCircleOutlined />} />
        </Space>
      </CanvasToolbar>
      <CanvasContent />
    </CanvasViewContainer>
  )
})
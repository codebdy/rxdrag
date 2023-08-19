import { memo } from "react"
import styled from "styled-components"
import { boxShadow, defaultVerticalMargin } from "../utils"
import { Button, Divider, Space } from "antd"
import { undoIcon, redoIcon, lineIcon, marginIcon, moveIcon, designIcon, jsonIcon, playIcon } from "../../icons"
import { EllipsisOutlined } from "@ant-design/icons"
import { DraggableWidget } from "../DraggableWidget"

const Container = styled(DraggableWidget)`
  position: fixed;
  height:40px;
  min-width: 60px;
  box-shadow: ${boxShadow};
  bottom: ${defaultVerticalMargin}px;
  left: 50%;
  transform: translateX(-50%);
  border: solid 1px ${props => props.theme?.token?.colorBorder};
  background-color: ${props => props.theme?.token?.colorBgContainer};
  border-radius: 8px;
  display: flex;
  align-items: center;
`

export const Toolbar = memo(() => {
  return (
    <Container className="rx-toolbar">
      <Space>
        <Button
          type={"text"}
          size="large"
          icon={undoIcon}
        //disabled={undoList.length === 0}
        //onClick={handleUndo}
        />
        <Button
          type={"text"}
          size="large"
          //disabled={redoList.length === 0}
          icon={redoIcon}
        //onClick={handleRedo}
        />
        <Divider type="vertical" />
        <Button
          type={"text"}
          size="large"
          //disabled={redoList.length === 0}
          icon={moveIcon}
        //onClick={handleRedo}
        />
        <Button
          type={"text"}
          size="large"
          //disabled={redoList.length === 0}
          icon={lineIcon}
        //onClick={handleRedo}
        />
        <Button
          type={"text"}
          size="large"
          //disabled={redoList.length === 0}
          icon={marginIcon}
        //onClick={handleRedo}
        />
        <Divider type="vertical" />
        <Button
          type={"text"}
          size="large"
          icon={designIcon}
        //onClick={handleRedo}
        />
        <Button
          type={"text"}
          size="large"
          icon={jsonIcon}
        //onClick={handleRedo}
        />
        <Button
          type={"text"}
          size="large"
          icon={playIcon}
        //onClick={handleRedo}
        />
        <Button
          type={"text"}
          size="large"
          icon={<EllipsisOutlined />}
        //onClick={handleRedo}
        />
      </Space>
    </Container>
  )
})
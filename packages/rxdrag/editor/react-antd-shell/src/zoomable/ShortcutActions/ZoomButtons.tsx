import { MinusOutlined, PlusOutlined } from "@ant-design/icons"
import { Button } from "antd"
import { memo } from "react"
import styled from "styled-components"
import { floatShadow } from "../utils"

const Container = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  border-radius: 8px;
  background-color: ${props => props.theme.token?.colorBgBase};
  box-shadow: ${floatShadow};
  width: 40px;
  overflow: hidden;
`

const PercentLabel = styled.div`
  font-size: 12px;
  user-select: none;
  cursor: pointer;
  padding: 8px 0;
`

const ZoomButton = styled(Button).attrs({ type: "text", block: true })`
  border-radius: 0;
`


export const ZoomButtons = memo(() => {
  return (
    <Container className="rx-zoom-buttons">
      <ZoomButton icon={<PlusOutlined />} />
      <PercentLabel>100%</PercentLabel>
      <ZoomButton icon={<MinusOutlined />} />
    </Container>
  )
})
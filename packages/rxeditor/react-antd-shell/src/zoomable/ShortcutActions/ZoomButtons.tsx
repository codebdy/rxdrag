import { MinusOutlined, PlusOutlined } from "@ant-design/icons"
import { Button, Tooltip } from "antd"
import { memo, useCallback } from "react"
import styled from "styled-components"
import { useSettersTranslate } from "@rxdrag/react-core"

const Container = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  background-color: ${props => props.theme.token?.colorBgBase};
  width: 32px;
  overflow: hidden;
`

const PercentLabel = styled(Button).attrs({ type: "text", block: true })`
  font-size: 11px;
  user-select: none;
  cursor: pointer;
  padding: 8px 0;
  border-radius: 0;
`

const ZoomButton = styled(Button).attrs({ type: "text", block: true })`
  border-radius: 0;
`


export const ZoomButtons = memo((
  props: {
    zoom: number,
    onZoomChange: (zoom: number) => void
  }
) => {
  const { zoom, onZoomChange } = props
  const t = useSettersTranslate()

  const handleZoomIn = useCallback(() => {
    const newzoom = zoom + 0.1
    if (newzoom > 3) {
      return
    }
    onZoomChange(newzoom)
  }, [onZoomChange, zoom])

  const handleZoomOut = useCallback(() => {
    const newzoom = zoom - 0.1
    if (newzoom < 0.1) {
      return
    }
    onZoomChange(newzoom)
  }, [onZoomChange, zoom])

  const handleReset = useCallback(() => {
    onZoomChange(1)
  }, [onZoomChange])

  return (
    <Container className="rx-zoom-buttons">
      <ZoomButton
        icon={<PlusOutlined />}
        onClick={handleZoomIn}
      />
      <Tooltip title={t("reset")}  placement="right">
        <PercentLabel
          onClick={handleReset}
        >
          {Math.round(zoom * 100)}%
        </PercentLabel>
      </Tooltip>
      <ZoomButton
        icon={<MinusOutlined />}
        onClick={handleZoomOut}
      />
    </Container>
  )
})
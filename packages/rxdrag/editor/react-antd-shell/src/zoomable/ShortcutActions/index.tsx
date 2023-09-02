import { Space } from "antd"
import { memo, useCallback, useState } from "react"
import styled from "styled-components"
import { AimOutlined, HistoryOutlined, PlayCircleOutlined } from "@ant-design/icons"
import { usePropertyWidthState } from "../contexts"
import { ZoomButtons } from "./ZoomButtons"
import { CanvasFloatButton } from "../common/FloatButton"
import { SvgIcon } from "../../common"
import { outlineIcon } from "../../icons"
import { DEFAULT_MARGIN } from "../consts"

const Container = styled.div`
  position: absolute;
  top: ${DEFAULT_MARGIN}px;
  right: 400px;
  display: flex;
  flex-flow: column;
  transition: all 0.3s;
`

const StyledButton = styled(CanvasFloatButton)`
  background-color: ${props => props.theme.token?.colorBgBase};
`

export const ShortcutActions = memo((
  props: {
    scrolled?: boolean,
    zoom: number,
    onZoomChange: (zoom: number) => void
    onResetScroll: () => void,
  }
) => {
  const { scrolled, zoom, onZoomChange, onResetScroll } = props
  const [outlineOpen, setOutlineOpen] = useState<boolean>()
  const [historyOpen, setHistoryOpen] = useState<boolean>()
  const [propertyWidth] = usePropertyWidthState()

  const handleToggleOutlineOpen = useCallback(() => {
    setHistoryOpen(false)
    setOutlineOpen(open => !open)
  }, [])

  const handleToggleHistoryOpen = useCallback(() => {
    setOutlineOpen(false)
    setHistoryOpen(open => !open)
  }, [])

  return (
    <>
      <Container
        className="rx-shortcut-actions"
        style={{
          right: propertyWidth + 24
        }}
      >
        <Space direction="vertical">
          <CanvasFloatButton icon={<PlayCircleOutlined />} />
          <ZoomButtons zoom={zoom} onZoomChange={onZoomChange} />
          <StyledButton
            type={outlineOpen ? "link" : undefined}
            icon={<SvgIcon>
              {outlineIcon}
            </SvgIcon>}
            onClick={handleToggleOutlineOpen}
          />
          <StyledButton
            type={historyOpen ? "link" : undefined}
            icon={<HistoryOutlined />}
            onClick={handleToggleHistoryOpen}
          />
          <CanvasFloatButton disabled={!scrolled} icon={<AimOutlined />} onClick={onResetScroll} />
        </Space>
      </Container>
    </>
  )
})
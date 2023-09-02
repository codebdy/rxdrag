import { Space } from "antd"
import { memo, useCallback, useMemo, useState } from "react"
import styled from "styled-components"
import { AimOutlined, HistoryOutlined, PlayCircleOutlined } from "@ant-design/icons"
import { usePropertyWidthState } from "../contexts"
import { ZoomButtons } from "./ZoomButtons"
import { CanvasFloatButton } from "../common/FloatButton"
import { OperationHistory, OutlineTree, SvgIcon } from "../../common"
import { outlineIcon } from "../../icons"
import { DEFAULT_MARGIN } from "../consts"
import { ExpandPanel } from "./ExpandPanel"
import { useSettersTranslate } from "@rxdrag/react-core"
import { WidgetTitle } from "../common/WidgetTitle"

const Container = styled.div`
  position: absolute;
  top: ${DEFAULT_MARGIN}px;
  right: 400px;
  display: flex;
  flex-flow: column;
  transition: all 0.3s;
  height: calc(100% - ${2 * DEFAULT_MARGIN}px);
`

const RelativeInner = styled.div`
  flex: 1;
  display: flex;
  flex-flow: column;
  width: 100%;
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
  const t = useSettersTranslate()
  const collapsed = useMemo(() => !outlineOpen && !historyOpen, [historyOpen, outlineOpen])

  const handleToggleOutlineOpen = useCallback(() => {
    setHistoryOpen(false)
    setOutlineOpen(open => !open)
  }, [])

  const handleToggleHistoryOpen = useCallback(() => {
    setOutlineOpen(false)
    setHistoryOpen(open => !open)
  }, [])

  const handleCloseExpand = useCallback(() => {
    setOutlineOpen(false)
    setHistoryOpen(false)
  }, [])

  return (
    <Container
      className="rx-shortcut-actions"
      style={{
        right: propertyWidth + 24
      }}
    >
      <RelativeInner>
        <ExpandPanel collapsed={collapsed}>
          {outlineOpen &&
            <>
              <WidgetTitle
                title={t("outline")}
                onClose={handleCloseExpand}
              />
              <OutlineTree />
            </>
          }

          {
            historyOpen && <>
              <WidgetTitle
                title={t("history")}
                onClose={handleCloseExpand}
              />
              <OperationHistory />
            </>
          }

        </ExpandPanel>
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
      </RelativeInner>
    </Container>
  )
})
import { Button } from "antd"
import { memo, useCallback, useMemo, useState } from "react"
import styled from "styled-components"
import { AimOutlined, HistoryOutlined, PlayCircleOutlined } from "@ant-design/icons"
import { usePreviewState, usePropertyWidthState } from "../contexts"
import { ZoomButtons } from "./ZoomButtons"
import { OperationHistory, OutlineTree, SvgIcon } from "../../common"
import { DEFAULT_MARGIN } from "../consts"
import { ExpandPanel } from "./ExpandPanel"
import { useSettersTranslate } from "@rxdrag/react-core"
import { WidgetTitle } from "../common/WidgetTitle"
import { floatBigShadow } from "../../utils"
import { outlineIcon, stopIcon } from "@rxdrag/react-shared"

const Container = styled.div`
  position: absolute;
  top: ${DEFAULT_MARGIN}px;
  right: 400px;
  display: flex;
  flex-flow: column;
  align-items: center;
  transition: all 0.3s;
  //height: calc(100% - ${2 * DEFAULT_MARGIN}px);
  //pointer-events: none;
  border-radius: 6px;
  background-color: ${props => props.theme.token.colorBgBase};
  box-shadow: ${floatBigShadow};
  border: solid 1px ${props => props.theme.token?.colorBorder};
`

const Content = styled.div`
  flex: 1;
  overflow: auto;
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
  const [preview, setPreview] = usePreviewState()
  const handleDesignClick = useCallback(() => {
    setPreview(false)
  }, [setPreview])

  const handlePreviewClick = useCallback(() => {
    setPreview(true)
  }, [setPreview])
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
        right: propertyWidth + 16
      }}
    >
      <ExpandPanel collapsed={collapsed}>
        {outlineOpen &&
          <>
            <WidgetTitle
              title={t("outline")}
              onClose={handleCloseExpand}
            />
            <Content>
              <OutlineTree />
            </Content>
          </>
        }

        {
          historyOpen && <>
            <WidgetTitle
              title={t("history")}
              onClose={handleCloseExpand}
            />
            <Content>
              <OperationHistory />
            </Content>
          </>
        }

      </ExpandPanel>
      <Button
        type="text"
        icon={preview
          ? <SvgIcon>
            {stopIcon}
          </SvgIcon>
          : <PlayCircleOutlined />
        }
        onClick={preview ? handleDesignClick : handlePreviewClick}
      />
      <ZoomButtons zoom={zoom} onZoomChange={onZoomChange} />
      <Button type="text" disabled={!scrolled} icon={<AimOutlined />} onClick={onResetScroll} />
      <Button
        type={outlineOpen ? "link" : "text"}
        icon={<SvgIcon>
          {outlineIcon}
        </SvgIcon>}
        onClick={handleToggleOutlineOpen}
      />
      <Button
        type={historyOpen ? "link" : "text"}
        icon={<HistoryOutlined />}
        onClick={handleToggleHistoryOpen}
      />
    </Container>
  )
})
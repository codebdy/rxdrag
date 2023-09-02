import { memo, useCallback, useState } from "react"
import styled from "styled-components"
import { ResizableColumn, SettingsForm } from "../../common"
import { usePropertyWidthState } from "../contexts"
import { floatShadow } from "../../utils"
import { Button } from "antd"
import { DEFAULT_MARGIN, MINI_WIDGET_WIDTH } from "../consts"
import { propertyIcon } from "../../icons"
import { useSettersTranslate } from "@rxdrag/react-core"
import { WidgetTitle } from "../common/WidgetTitle"

const PanelShell = styled(ResizableColumn)`
  position: absolute;
  top: ${DEFAULT_MARGIN}px;
  right: ${DEFAULT_MARGIN}px;
  height: calc(100% - ${DEFAULT_MARGIN * 2}px);
  border-radius: 8px;
  background-color: ${props => props.theme.token?.colorBgBase};
  box-shadow: ${floatShadow};
`

export const PropertyPanel = memo(() => {
  const [collapsed, setCollapsed] = useState(false)
  const [propertyWidth, setPropertyWidth] = usePropertyWidthState()
  const [oldeWidth, setOldWidth] = useState(propertyWidth)
  const t = useSettersTranslate()

  const handleCollapse = useCallback(() => {
    setCollapsed(true)
    setOldWidth(propertyWidth)
    setPropertyWidth(MINI_WIDGET_WIDTH)
  }, [propertyWidth, setPropertyWidth])

  const handleOpen = useCallback(() => {
    setCollapsed(false)
    setPropertyWidth(oldeWidth)
  }, [oldeWidth, setPropertyWidth])

  return (
    <PanelShell
      right
      maxWidth={1000}
      minWidth={280}
      width={propertyWidth}
      onWidthChange={setPropertyWidth}
      style={{
        height: collapsed ? 32 : undefined,
        width: collapsed ? 32 : undefined,
        minWidth: collapsed ? 32 : undefined,
      }}
    >
      {
        collapsed
          ? <Button
            type="text"

            icon={propertyIcon}
            onClick={handleOpen}
          />
          : <>
            <WidgetTitle
              icon={propertyIcon}
              title={t("properties")}
              onClose={handleCollapse}
            />
            <SettingsForm />
          </>
      }

    </PanelShell>
  )
})
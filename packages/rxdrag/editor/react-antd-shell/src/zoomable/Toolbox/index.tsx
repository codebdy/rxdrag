import { memo, useCallback, useState } from "react"
import styled from "styled-components"
import { ResizableColumn } from "../../common"
import { useToolboxWidthState } from "../contexts"
import { floatShadow } from "../../utils"
import { Button } from "antd"
import { DEFAULT_MARGIN, MINI_PRO_WIDTH } from "../consts"
import { useSettersTranslate } from "@rxdrag/react-core"
import { WidgetTitle } from "../common/WidgetTitle"
import { AppstoreOutlined } from "@ant-design/icons"

const ToolboxShell = styled(ResizableColumn)`
  position: absolute;
  top: ${DEFAULT_MARGIN}px;
  left: ${DEFAULT_MARGIN}px;
  height: calc(100% - ${DEFAULT_MARGIN * 2}px);
  border-radius: 8px;
  background-color: ${props => props.theme.token?.colorBgBase};
  box-shadow: ${floatShadow};
`

export const Toolbox = memo((
  props: {
    children?: React.ReactNode,
  }
) => {
  const { children } = props;
  const [collapsed, setCollapsed] = useState(false)
  const [toolboxWidth, setToolboxWidth] = useToolboxWidthState()
  const [oldeWidth, setOldWidth] = useState(toolboxWidth)
  const t = useSettersTranslate()

  const handleCollapse = useCallback(() => {
    setCollapsed(true)
    setOldWidth(toolboxWidth)
    setToolboxWidth(MINI_PRO_WIDTH)
  }, [toolboxWidth, setToolboxWidth])

  const handleOpen = useCallback(() => {
    setCollapsed(false)
    setToolboxWidth(oldeWidth)
  }, [oldeWidth, setToolboxWidth])

  return (
    <ToolboxShell
      right
      maxWidth={1000}
      minWidth={280}
      width={toolboxWidth}
      onWidthChange={setToolboxWidth}
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

            icon={<AppstoreOutlined />}
            onClick={handleOpen}
          />
          : <>
            <WidgetTitle
              icon={<AppstoreOutlined />}
              title={t("properties")}
              onClose={handleCollapse}
            />
            {children}
          </>
      }

    </ToolboxShell>
  )
})
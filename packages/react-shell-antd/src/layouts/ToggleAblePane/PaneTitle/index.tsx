import { CloseOutlined } from "@ant-design/icons"
import { Button } from "antd"
import { useToolsTranslate } from "core-react/hooks/useToolsTranslate"
import { memo, useCallback } from "react"
import { useStyles } from "react-shells/ant5/hooks/useStyles"
import { useToggleState } from "../hooks/useToggleState"
import "./style.less"

export const PaneTitle = memo((
  props: {
    title?: string,
    button?: React.ReactNode,
  }
) => {
  const { title, button } = props;
  const { setToggled } = useToggleState()
  const styles = useStyles((token) => ({
    borderColor: token.colorBorder,
    color: token.colorText,
  }))
  const t = useToolsTranslate()

  const handleCloseClick = useCallback(() => {
    setToggled(true)
  }, [setToggled])

  return (
    <div
      className="rx-toggle-pane-title"
      style={styles}
    >
      <div>{t(title || "")}</div>
      {
        button || <Button icon={<CloseOutlined />} shape="circle" type="text" onClick={handleCloseClick} />
      }
    </div>
  )
})
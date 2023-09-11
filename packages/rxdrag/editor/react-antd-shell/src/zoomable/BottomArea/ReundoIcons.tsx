import { Button, Space, Tooltip } from "antd"
import { memo } from "react"
import { SvgIcon } from "../../common"
import { useUndo, useRedo, useSettersTranslate } from "@rxdrag/react-core"

export const ReundoIcons = memo(() => {
  const [canUndo, undo] = useUndo()
  const [canRedo, redo] = useRedo()
  const t = useSettersTranslate()

  return (<Space size={4}>
    <Tooltip title={t("undo")}>
      <div>
        <Button
          size="small"
          type={"text"}
          icon={
            <SvgIcon>
              <svg fill="currentColor" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"><path d="M258.986667 509.013333c277.76-273.621333 697.045333-117.546667 699.306666 188.885334l-7.765333 2.645333c-176.853333-218.112-417.024-291.84-605.866667-106.453333a4.522667 4.522667 0 0 0-0.085333 6.314666l117.589333 117.589334a4.266667 4.266667 0 0 1-2.986666 7.253333H132.266667a4.266667 4.266667 0 0 1-4.266667-4.266667V394.24c0-3.84 4.608-5.717333 7.253333-2.986667l117.76 117.76c1.621333 1.706667 4.266667 1.621333 5.888 0z"></path></svg>
            </SvgIcon>
          }
          disabled={!canUndo}
          onClick={undo}
        />
      </div>
    </Tooltip>
    <Tooltip title={t("redo")}>
      <div>
        <Button
          size="small"
          type={'text'}
          icon={
            <SvgIcon>
              <svg fill="currentColor" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"><path d="M765.013333 509.013333C487.253333 235.392 67.968 391.466667 65.792 697.941333l7.765333 2.645334c176.853333-218.112 417.024-291.84 605.866667-106.453334 1.706667 1.706667 1.792 4.608 0.085333 6.314667L561.92 718.08a4.266667 4.266667 0 0 0 2.986667 7.296h326.826666a4.266667 4.266667 0 0 0 4.266667-4.266667V394.24a4.224 4.224 0 0 0-7.253333-2.986667l-117.76 117.76a4.096 4.096 0 0 1-5.888 0z"></path></svg>
            </SvgIcon>
          }
          disabled={!canRedo}
          onClick={redo}
        />
      </div>
    </Tooltip>
  </Space>)
})
import { Button } from "antd"
import { memo } from "react"
import { redoIcon } from "../../icons"

export const RedoButton = memo(() => {
  return (
    <Button
      type={"text"}
      size="large"
      icon={redoIcon}
    //disabled={undoList.length === 0}
    //onClick={handleUndo}
    />
  )
})
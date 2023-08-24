import { Button } from "antd"
import { memo } from "react"
import { undoIcon } from "../../icons"

export const UndoButton = memo(() => {
  return (
    <Button
      type={"text"}
      size="large"
      icon={undoIcon}
    //disabled={undoList.length === 0}
    //onClick={handleUndo}
    />
  )
})
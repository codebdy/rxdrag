import { Button } from "antd"
import { memo } from "react"
import { useUndo } from "@rxdrag/react-core"
import { undoIcon } from "@rxdrag/react-shared"

export const UndoButton = memo(() => {
  const [canUndo, undo] = useUndo()
  return (
    <Button
      type={"text"}
      size="large"
      icon={undoIcon}
      disabled={!canUndo}
      onClick={undo}
    />
  )
})
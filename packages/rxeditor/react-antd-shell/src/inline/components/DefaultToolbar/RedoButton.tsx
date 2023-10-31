import { Button } from "antd"
import { memo } from "react"
import { useRedo } from "@rxdrag/react-core"
import { redoIcon } from "@rxdrag/react-shared"

export const RedoButton = memo(() => {
  const [canRedo, redo] = useRedo()
  return (
    <Button
      type={"text"}
      size="large"
      icon={redoIcon}
      disabled={!canRedo}
      onClick={redo}
    />
  )
})
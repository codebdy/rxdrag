import { Button } from "antd"
import { memo } from "react"
import { redoIcon } from "../../icons"
import { useRedo } from "@rxdrag/react-core"

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
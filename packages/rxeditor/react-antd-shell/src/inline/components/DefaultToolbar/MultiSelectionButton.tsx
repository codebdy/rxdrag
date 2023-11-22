import { moveIcon } from "@rxdrag/react-shared"
import { Button } from "antd"
import { memo } from "react"

export const MultiSelectionButton = memo(() => {
  return (
    <Button
      type={"text"}
      size="large"
      //disabled={redoList.length === 0}
      icon={moveIcon}
    //onClick={handleRedo}
    />
  )
})
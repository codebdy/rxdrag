import { designIcon } from "@rxdrag/react-shared"
import { Button } from "antd"
import { memo } from "react"

export const DesignButton = memo(() => {
  return (
    <Button
      type={"text"}
      size="large"
      icon={designIcon}
    //onClick={handleRedo}
    />
  )
})
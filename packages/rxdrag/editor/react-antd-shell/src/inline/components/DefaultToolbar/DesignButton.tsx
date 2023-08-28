import { Button } from "antd"
import { memo } from "react"
import { designIcon } from "../../icons"

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
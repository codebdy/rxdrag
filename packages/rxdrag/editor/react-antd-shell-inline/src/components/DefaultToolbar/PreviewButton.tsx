import { Button } from "antd"
import { memo } from "react"
import { playIcon } from "../../icons"

export const PreviewButton = memo(() => {
  return (
    <Button
      type={"text"}
      size="large"
      icon={playIcon}
    //onClick={handleRedo}
    />
  )
})
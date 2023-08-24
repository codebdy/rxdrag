import { Button } from "antd"
import { memo } from "react"
import { jsonIcon } from "../../icons"

export const JSONButton = memo(() => {
  return (
    <Button
      type={"text"}
      size="large"
      icon={jsonIcon}
    //onClick={handleRedo}
    />
  )
})
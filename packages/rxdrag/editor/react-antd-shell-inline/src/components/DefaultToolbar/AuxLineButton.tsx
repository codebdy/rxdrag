import { Button } from "antd"
import { memo } from "react"
import { lineIcon } from "../../icons"

export const AuxLineButton = memo(() => {
  return (
    <Button
      type={"text"}
      size="large"
      //disabled={redoList.length === 0}
      icon={lineIcon}
    //onClick={handleRedo}
    />
  )
})
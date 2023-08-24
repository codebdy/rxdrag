import { Button } from "antd"
import { memo } from "react"
import { marginIcon } from "../../icons"

export const AuxMarginButton = memo(() => {
  return (
    <Button
      type={"text"}
      size="large"
      //disabled={redoList.length === 0}
      icon={marginIcon}
    //onClick={handleRedo}
    />
  )
})
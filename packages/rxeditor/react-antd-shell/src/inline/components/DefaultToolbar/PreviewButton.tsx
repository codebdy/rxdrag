import { playIcon } from "@rxdrag/react-shared"
import { Button, ButtonProps } from "antd"
import { memo } from "react"

export const PreviewButton = memo((
  props: ButtonProps
) => {
  return (
    <Button
      type={"text"}
      size="large"
      icon={playIcon}
      {...props}
    />
  )
})
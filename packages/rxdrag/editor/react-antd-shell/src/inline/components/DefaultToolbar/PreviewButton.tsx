import { Button, ButtonProps } from "antd"
import { memo } from "react"
import { playIcon } from "../../icons"

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
import { memo } from "react"

import { Spring } from "../../common"
import { ToolbarRightButttons } from "./ToolbarRightButttons"

export const DefaultTopbar = memo((props: {
  children?: React.ReactNode,
  right?: React.ReactNode,
}) => {
  const { right, children } = props;
  return (
    <>
      {children}
      <Spring />
      {
        right || <ToolbarRightButttons />
      }
    </>
  )
})
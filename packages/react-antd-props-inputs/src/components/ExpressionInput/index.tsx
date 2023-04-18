import { FunctionOutlined } from "@ant-design/icons"
import { Button } from "antd"
import { memo } from "react"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ExpressionInput = memo((props: any) => {
  return (
    <>
      <Button icon={<FunctionOutlined />} {...props} />
    </>
  )
})

ExpressionInput.displayName = "ExpressionInput"
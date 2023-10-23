import { Select, Input, Space } from "antd"
import { memo } from "react"
import { OperatorSelect } from "./OperatorSelect"
import type { ExpressionInputProps } from "./ExpressionInputProps"

export const DefaultExpressionInput = memo((
  props: ExpressionInputProps
) => {
  return (
    <Space>
      <Select
        defaultValue="xxx"
        options={[
          { value: 'xxx', label: '物料' },
          { value: 'yyy', label: '或' },
        ]}
      />
      <OperatorSelect />
      <Input />
    </Space>
  )
})
import { Select } from "antd"
import { memo } from "react"

export const VariableSelect = memo(() => {
  return (
    <Select
      defaultValue="lucy"
      options={[
        { value: 'jack', label: 'Jack' },
        { value: 'lucy', label: 'Lucy' },
        { value: 'Yiminghe', label: 'yiminghe' },
        { value: 'disabled', label: 'Disabled', disabled: true },
      ]}
    />
  )
})
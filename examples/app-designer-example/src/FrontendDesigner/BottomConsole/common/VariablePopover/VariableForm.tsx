import { Form, Input } from "antd"
import { memo } from "react"

export const VariableForm = memo(() => {
  return (
    <Form
      name="varialble"
      labelAlign="left"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      autoComplete="off"
      style={{ paddingTop: 8 }}
    >
      <Form.Item
        label="名称"
        name="name"
        rules={[{ required: true, message: 'Please input varabile name!' }]}
      >
        <Input />
      </Form.Item>
    </Form>
  )
})
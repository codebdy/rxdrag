import { Form, Input } from "antd";
import React from "react";

export const IdItem = () => {
  return (
    <Form.Item
      label="ID"
      name="id"
    >
      <Input />
    </Form.Item>
  )
}
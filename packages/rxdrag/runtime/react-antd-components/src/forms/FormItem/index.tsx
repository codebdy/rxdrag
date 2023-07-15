import React, { useContext } from "react"
import { Form, FormItemProps } from "antd";
import { memo } from "react";
import { FormLayoutContext } from "../contexts";

export const FormItem: React.FC<{
  children?: React.ReactNode
} & FormItemProps> = memo((props) => {
  const { children, ...other } = props

  const formParams = useContext(FormLayoutContext);

  return (
    <Form.Item
      {...formParams}
      {...other}
    >
      {children}
    </Form.Item>
  )
})
import React, { useContext } from "react"
import { Form } from "antd";
import { forwardRef, memo } from "react";
import { FormLayoutContext } from "../contexts";

export const FormItem = memo(forwardRef<HTMLDivElement>((
  props: {
    children?: React.ReactNode
  },
  ref
) => {
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
}))
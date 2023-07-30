import React, { useContext, useMemo } from "react"
import { Form, FormItemProps } from "antd";
import { memo } from "react";
import { FormLayoutContext } from "../contexts";
import { isArray } from "lodash";

export const FormItem: React.FC<{
  value?: unknown,
  onChange?: (value?: unknown) => void,
  children?: React.ReactElement
} & FormItemProps> = memo((props) => {
  const { value, onChange, children, ...other } = props

  const formParams = useContext(FormLayoutContext);
  const child = useMemo(() => {
    return isArray(children) ? children?.[0] : children
  }, [children])
  return (
    <Form.Item
      {...formParams}
      {...other}
    >
      {child && React.cloneElement(child, { value, onChange })}
    </Form.Item>
  )
})
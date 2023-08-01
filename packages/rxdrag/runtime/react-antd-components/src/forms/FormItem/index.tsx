import React, { useContext, useMemo } from "react"
import { Form, FormItemProps } from "antd";
import { memo } from "react";
import { FormLayoutContext } from "../contexts";
import { isArray } from "lodash";

//把输入输出事件，绑定到第一个元素
export const FormItem: React.FC<{
  value?: unknown,
  onChange?: (value?: unknown) => void,
  children?: React.ReactElement
} & FormItemProps> = memo((props) => {
  const { value, onChange, children, ...other } = props

  const formParams = useContext(FormLayoutContext);
  const { child, rest } = useMemo(() => {
    if (isArray(children)) {
      const [child, ...rest] = children
      return { child, rest }
    } else {
      return { child: children }
    }
  }, [children])
  return (
    <Form.Item
      {...formParams}
      {...other}
    >
      {child && React.cloneElement(child, { value, onChange })}
      {rest}
    </Form.Item>
  )
})
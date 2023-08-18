import React, { useContext, useMemo } from "react"
import { Form, FormItemProps as AntdFormItemProps } from "antd";
import { memo } from "react";
import { FormLayoutContext } from "../contexts";
import { isArray } from "lodash";
import { useField, useFieldErrors } from "@rxdrag/react-fieldy";
import styled from "styled-components";

const Error = styled.div`
  color: red;
`

export type FormItemProps = {
  value?: unknown,
  onChange?: (value?: unknown) => void,
  children?: React.ReactElement
} & AntdFormItemProps

//把输入输出事件，绑定到第一个元素
export const FormItem: React.FC<FormItemProps> = memo((props) => {
  const { value, onChange, children, required, extra, ...other } = props
  const field = useField();
  const errors = useFieldErrors();
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
      validateStatus={errors?.length ? "error" : "success"}
      extra={
        errors?.length
          ? <Error>{errors.join(",")}</Error >
          : extra
      }
      required={required || field?.meta?.validateRules?.required}
    >
      {child && React.cloneElement(child, { value, onChange })}
      {rest}
    </Form.Item>
  )
})
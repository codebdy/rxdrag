import { Form } from "antd"
import React, { memo, CSSProperties } from "react"

export type FieldProps = {
  value?: any,
  onChange?: (value?: any) => void,
  colon?: boolean,
  extra?: string,
  help?: string,
  hidden?: boolean,
  initialValue?: any,
  label?: string,
  labelAlign?: 'left' | 'right',
  labelCol?: any,
  wrapperCol?: any,
  validateStatus?: 'success' | 'warning' | 'error' | 'validating',
  input?: React.ReactElement,
  className?: string,
  style?: CSSProperties,
}
export const Field = memo((props: FieldProps) => {
  const { colon,
    extra,
    help,
    hidden,
    label,
    labelAlign,
    labelCol,
    wrapperCol,
    validateStatus,
    input,
    className,
    style,
    ...other
  } = props
  return (
    <Form.Item {...{
      colon,
      extra,
      help,
      hidden,
      label,
      labelAlign,
      labelCol,
      wrapperCol,
      validateStatus,
      className,
      style,
    }}>
      {input && React.cloneElement(input, other)}
    </Form.Item>
  )
})
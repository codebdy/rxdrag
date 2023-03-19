import { Form } from "antd"
import { ID, NodeStatus, NodeType, RXID_ATTR_NAME, RX_NODE_TYPE_ATTR_NAME, RX_STATUS_ATTR_NAME } from "core"
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
  [RXID_ATTR_NAME]: ID,
  [RX_NODE_TYPE_ATTR_NAME]?: NodeType, //默认为Normal
  [RX_STATUS_ATTR_NAME]?: NodeStatus //默认为Normal
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
    [RXID_ATTR_NAME]: rxId,
    [RX_NODE_TYPE_ATTR_NAME]: rxNodeType,
    [RX_STATUS_ATTR_NAME]: rxStatus,
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
      [RXID_ATTR_NAME]: rxId,
      [RX_NODE_TYPE_ATTR_NAME]: rxNodeType,
      [RX_STATUS_ATTR_NAME]: rxStatus,
    }}>
      {input && React.cloneElement(input, other)}
    </Form.Item>
  )
})
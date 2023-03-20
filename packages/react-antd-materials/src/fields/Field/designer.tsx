import { RXID_ATTR_NAME, RX_NODE_TYPE_ATTR_NAME, NodeType, RX_STATUS_ATTR_NAME, NodeStatus } from "@rxdrag/core"
import { FieldProps } from "@rxdrag/react-antd-components"
import { ID } from "@rxdrag/shared"
import { Form } from "antd"
import React, { memo, CSSProperties } from "react"

export type FieldDesignerProps = FieldProps &{
  [RXID_ATTR_NAME]: ID,
  [RX_NODE_TYPE_ATTR_NAME]?: NodeType, //默认为Normal
  [RX_STATUS_ATTR_NAME]?: NodeStatus //默认为Normal
}
export const FieldDesigner = memo((props: FieldDesignerProps) => {
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
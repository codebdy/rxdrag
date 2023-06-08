import { VirtualForm } from "@rxdrag/react-fieldy"
import { memo } from "react"
import { Form as AntdForm, FormProps } from "antd"
import _ from "lodash"

export const Form = memo((
  props: {
    initialValue?: object,
    defaultValue?: object,
    value?: object,
    children?: React.ReactNode,
  } & FormProps
) => {
  const { initialValue, defaultValue, value, children, ...other } = props;

  if (value && !_.isObject(value)) {
    console.error("Form value is not object", value)
  }

  return (
    <VirtualForm initialValue={initialValue} defaultValue={defaultValue} value={value}>
      <AntdForm {...other}>
        {children}
      </AntdForm>
    </VirtualForm>
  )
})
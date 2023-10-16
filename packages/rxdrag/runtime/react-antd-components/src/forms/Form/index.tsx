import { VirtualForm } from "@rxdrag/react-fieldy"
import { memo } from "react"
import { Form as AntdForm, FormProps } from "antd"
import _ from "lodash"
import { FormValue } from "@rxdrag/fieldy"
import { PassFormToController } from "./PassFormToController"
import { withContainerLayout } from "../../hocs"

// 内部加入一个组件，用于把Ifrom对象传递给外面的控制器
export const FormImpl = memo((
  props: {
    initialValue?: FormValue,
    defaultValue?: FormValue,
    value?: FormValue,
    children?: React.ReactNode,
    onChange?: (value?: FormValue) => void,
  } & FormProps
) => {
  const { initialValue, defaultValue, value, children, onChange, ...other } = props;

  if (value && !_.isObject(value)) {
    console.error("Form value is not object", value)
  }

  return (
    <VirtualForm
      initialValue={initialValue}
      defaultValue={defaultValue}
      value={value}
      onValueChange={onChange}
    >
      <PassFormToController />
      <AntdForm {...other}>
        {children}
      </AntdForm>
    </VirtualForm>
  )
})

export const Form = withContainerLayout(FormImpl)
import { VirtualForm } from "@rxdrag/react-fieldy"
import { memo, useMemo } from "react"
import { Form as AntdForm, FormProps } from "antd"
import _ from "lodash"
import { FormValue } from "@rxdrag/fieldy"
import { PassFormToController } from "./PassFormToController"
import { withContainerLayout } from "../../hocs"
import { DisplayProps, DisplayType, PatternType } from "../types"
import { DisplayContext } from "../contexts"

// 内部加入一个组件，用于把Ifrom对象传递给外面的控制器
export const FormImpl = memo((
  props: {
    initialValue?: FormValue,
    defaultValue?: FormValue,
    value?: FormValue,
    children?: React.ReactNode,
    onChange?: (value?: FormValue) => void,
  } & FormProps & DisplayProps
) => {
  const { initialValue, defaultValue, value, children, onChange, display, pattern, prettyComponent, style, ...other } = props;

  if (value && !_.isObject(value)) {
    console.error("Form value is not object", value)
  }

  const dispalyValue = useMemo(() => ({
    display,
    pattern,
    prettyComponent
  }), [display, pattern, prettyComponent])

  return (
    <DisplayContext.Provider value={dispalyValue}>
      <VirtualForm
        initialValue={initialValue}
        defaultValue={defaultValue}
        value={value}
        onValueChange={onChange}
      >
        <PassFormToController />
        {
          display !== DisplayType.none &&
          <AntdForm
            disabled={pattern === PatternType.disabled}
            style={{
              ...style,
              display: display === DisplayType.hidden ? "none" : undefined
            }}
            {...other}
          >
            {children}
          </AntdForm>
        }
      </VirtualForm>
    </DisplayContext.Provider>
  )
})

export const Form = withContainerLayout(FormImpl)
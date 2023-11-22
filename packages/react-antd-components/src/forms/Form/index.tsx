import { VirtualForm } from "@rxdrag/react-fieldy"
import { forwardRef, memo, useMemo } from "react"
import { Form as AntdForm, FormProps } from "antd"
import _ from "lodash"
import { FormValue } from "@rxdrag/fieldy"
import { PassFormToController } from "./PassFormToController"
import { withContainerLayout } from "../../hocs"
import { DisplayProps, DisplayType, PatternType } from "../types"
import { DisplayContext } from "../contexts"

export type FormImplProps = {
  initialValue?: FormValue,
  defaultValue?: FormValue,
  value?: FormValue,
  children?: React.ReactNode,
  onChange?: (value?: FormValue) => void,
} & FormProps & DisplayProps

// 内部加入一个组件，用于把Ifrom对象传递给外面的控制器
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const FormImpl = memo(forwardRef<any, FormImplProps>((props, ref) => {
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
            ref={ref}
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
}))

export const Form = withContainerLayout(FormImpl)
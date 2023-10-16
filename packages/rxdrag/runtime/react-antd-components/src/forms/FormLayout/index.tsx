import { CSSProperties, forwardRef, memo, useMemo } from "react";
import { DisplayContext, FormLayoutContext, FormLayoutParams } from "../contexts";
import classNames from "classnames"
import { withContainerLayout } from "../../hocs";
import { DisplayProps, DisplayType } from "../types";

const FormLayoutImpl = memo(forwardRef<HTMLDivElement, FormLayoutParams & DisplayProps & {
  className?: string,
  children?: React.ReactNode,
  style?: CSSProperties,
}>((props, ref) => {
  const { children,
    colon,
    disabled,
    labelAlign,
    labelWrap,
    labelCol,
    wrapperCol,
    layout = "horizontal",
    className,
    display,
    pattern,
    prettyComponent,
    style,
    ...rest
  } = props

  const params = useMemo(() => ({
    colon,
    disabled,
    labelAlign,
    labelWrap,
    labelCol,
    wrapperCol,
    layout
  }), [colon, disabled, labelAlign, labelCol, labelWrap, layout, wrapperCol])

  const dispalyValue = useMemo(() => ({
    display,
    pattern,
    prettyComponent
  }), [display, pattern, prettyComponent])

  //ant-form-vertical, ant-form-inline, ant-form-horizontal
  const layoutClass = `ant-form-${layout}`

  return (<div ref={ref}
    className={classNames(layoutClass, className, "ant-form")}
    style={{ ...style, display: display === DisplayType.hidden ? "none" : undefined }}
    {...rest}
  >
    <FormLayoutContext.Provider value={params}>
      <DisplayContext.Provider value={dispalyValue}>
        {children}
      </DisplayContext.Provider>
    </FormLayoutContext.Provider>
  </div>
  )
}))

export const FormLayout = withContainerLayout(FormLayoutImpl)
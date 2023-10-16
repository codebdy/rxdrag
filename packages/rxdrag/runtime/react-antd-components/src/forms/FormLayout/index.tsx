import { forwardRef, memo, useMemo } from "react";
import { FormLayoutContext, FormLayoutParams } from "../contexts";
import classNames from "classnames"
import { withContainerLayout } from "../../hocs";

const FormLayoutImpl = memo(forwardRef<HTMLDivElement, FormLayoutParams & {
  className?: string,
  children?: React.ReactNode,
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

  //ant-form-vertical, ant-form-inline, ant-form-horizontal
  const layoutClass = `ant-form-${layout}`

  return (<div ref={ref} className={classNames(layoutClass, className, "ant-form")} {...rest}>
    <FormLayoutContext.Provider value={params}>
      {children}
    </FormLayoutContext.Provider>
  </div>
  )
}))

export const FormLayout = withContainerLayout(FormLayoutImpl)
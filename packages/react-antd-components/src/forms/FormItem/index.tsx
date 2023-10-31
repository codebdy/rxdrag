import React, { useContext, useEffect, useMemo } from "react"
import { Form, FormItemProps as AntdFormItemProps } from "antd";
import { memo } from "react";
import { DisplayContext, FormLayoutContext } from "../contexts";
import { isArray } from "lodash";
import { useField, useFieldErrors } from "@rxdrag/react-fieldy";
import styled from "styled-components";
import { useComponentSchema, useController, usePreviewComponent } from "@rxdrag/react-runner";
import { DisplayProps, DisplayType, PatternType } from "../types";
import { DefaultPretty } from "../DefaultPretty";

const Error = styled.div`
  color: red;
`

export type FormItemProps = {
  value?: unknown,
  onChange?: (value?: unknown) => void,
  children?: React.ReactElement
} & AntdFormItemProps & DisplayProps

//把输入输出事件，绑定到第一个元素
export const FormItem: React.FC<FormItemProps> = memo((props) => {
  const {
    value,
    onChange,
    children,
    required,
    extra,
    display,
    pattern,
    prettyComponent,
    style,
    label = "FormItem",
    ...other
  } = props
  const field = useField();
  const schema = useComponentSchema()
  const errors = useFieldErrors();
  const formParams = useContext(FormLayoutContext);
  const dispalyValue = useContext(DisplayContext);
  const displayType = display || dispalyValue?.display;
  const patternType = pattern || dispalyValue?.pattern;
  const prettyComponentName = dispalyValue?.prettyComponent || prettyComponent;
  const PrettyCom = usePreviewComponent(prettyComponentName) || DefaultPretty

  const { child, rest } = useMemo(() => {
    if (isArray(children)) {
      const [child, ...rest] = children
      return { child, rest }
    } else {
      return { child: children }
    }
  }, [children])

  const controller = useController()
  useEffect(() => {
    if (controller && schema?.["x-controller"]?.enable) {
      controller.fieldyNode = field
    }
  }, [controller, field, schema])

  const readOnly = patternType === PatternType.readOnly;
  const disabled = patternType === PatternType.disabled;

  return (
    displayType !== DisplayType.none
      ? <Form.Item
        label={field?.meta?.label || label}
        {...formParams}
        {...other}
        validateStatus={errors?.length ? "error" : "success"}
        extra={
          errors?.length
            ? <Error>{errors.join(",")}</Error >
            : extra
        }
        required={required || field?.meta?.validateRules?.required}
        style={{
          ...style,
          display: displayType === DisplayType.hidden ? "none" : undefined
        }}
      >
        {
          patternType === PatternType.readPretty
            ? <PrettyCom value={value} />
            : <>
              {child && React.cloneElement(child, { readOnly, disabled, value, onChange, })}
              {rest}
            </>
        }
      </Form.Item>
      : <></>
  )
})
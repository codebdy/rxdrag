import { memo } from "react"
import { INodeMeta } from "@rxdrag/schema"
import { Form, FormItemProps as AntdFormItemProps } from "antd";
import styled from "styled-components";
import { useField, useFieldErrors } from "@rxdrag/react-fieldy";
import { usePreviewComponent } from "@rxdrag/react-runner";

const Error = styled.div`
  color: red;
`

//FormItem跟input的组合
//本组件强依赖feidly跟渲染引擎
export const FormField = memo((
  props: {
    value?: unknown,
    onChange?: (value?: unknown) => void,
    inputMeta: INodeMeta,
  } & AntdFormItemProps
) => {
  const { value, onChange, inputMeta, required, extra, ...rest } = props;
  const field = useField();
  const errors = useFieldErrors();

  const Component = usePreviewComponent(inputMeta.componentName)

  return <Form.Item
    {...rest}
    validateStatus={errors?.length ? "error" : "success"}
    extra={
      errors?.length
        ? <Error>{errors.join(",")}</Error >
        : extra
    }
    required={required || field?.meta?.validateRules?.required}
  >
    {
      Component && <Component {...inputMeta.props} value={value} onChange={onChange} />
    }
  </Form.Item>
})
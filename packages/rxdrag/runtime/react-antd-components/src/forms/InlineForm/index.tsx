import { FormProps } from "antd"
import { memo } from "react"
import { Form } from "../Form";
import { useFieldValue } from "@rxdrag/react-fieldy";

export const InlineForm = memo((
  props: {
    initialValue?: object,
    defaultValue?: object,
    children?: React.ReactNode,
  } & FormProps
) => {
  const { children, ...other } = props;
  const value = useFieldValue();

  return (
    <Form value={value as object | undefined} {...other}>
      {children}
    </Form>
  )
})
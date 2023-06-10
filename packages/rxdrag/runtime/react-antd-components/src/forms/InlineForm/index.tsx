import { FormProps } from "antd"
import { memo } from "react"
import { Form } from "../Form";
import { useFieldValue } from "@rxdrag/react-fieldy";
import { FormValue } from "@rxdrag/fieldy";

export const InlineForm = memo((
  props: {
    initialValue?: FormValue,
    defaultValue?: FormValue,
    children?: React.ReactNode,
  } & FormProps
) => {
  const { children, ...other } = props;
  const value = useFieldValue();

  return (
    <Form initialValue={value as FormValue | undefined} {...other}>
      {children}
    </Form>
  )
})
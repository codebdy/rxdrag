import { FormProps } from "antd"
import { memo } from "react"
import { Form } from "../Form";
import { useFieldValue } from "@rxdrag/react-fieldy";
import { FormValue } from "@rxdrag/fieldy";
import { withContainerLayout } from "../../hocs";

const InlineFormImpl = memo((
  props: {
    initialValue?: FormValue,
    defaultValue?: FormValue,
    children?: React.ReactNode,
    onChange?: (value?: FormValue) => void,
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

export const InlineForm = withContainerLayout(InlineFormImpl)
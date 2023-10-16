import { FormProps } from "antd"
import { memo } from "react"
import { useFieldValue } from "@rxdrag/react-fieldy";
import { FormValue } from "@rxdrag/fieldy";
import { withContainerLayout } from "../../hocs";
import { DisplayProps } from "../types";
import { FormLayout } from "../FormLayout";

const InlineFormImpl = memo((
  props: {
    initialValue?: FormValue,
    defaultValue?: FormValue,
    children?: React.ReactNode,
    onChange?: (value?: FormValue) => void,
  } & FormProps & DisplayProps
) => {
  const { children, ...other } = props;
  const value = useFieldValue();

  return (
    <FormLayout initialValue={value as FormValue | undefined} {...other}>
      {children}
    </FormLayout>
  )
})

export const InlineForm = withContainerLayout(InlineFormImpl)
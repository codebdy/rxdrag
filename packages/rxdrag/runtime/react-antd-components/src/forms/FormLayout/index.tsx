import { memo } from "react";
import { FormLayoutContext, FormLayoutParams } from "../contexts";


export const FormLayout = memo((props: FormLayoutParams & {
  children?: React.ReactNode,
}) => {
  const { children, ...params } = props
  return (
    <FormLayoutContext.Provider value={params}>
      {children}
    </FormLayoutContext.Provider>
  )
})
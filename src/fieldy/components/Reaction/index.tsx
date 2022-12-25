import { memo } from "react"
import { useOnFieldsValueChange } from "./hooks/useOnFieldsValueChange"

export const Reaction = memo((
  props: {
    children?: React.ReactNode
  }
) => {
  useOnFieldsValueChange();

  return (
    <>
      {props.children}
    </>
  )
})
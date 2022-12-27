import { memo } from "react"
import { useOnMultiFieldValueChange } from "./hooks/useOnMultiFieldValueChange"
import { useOnFieldValueChange } from "./hooks/useOnFieldValueChange";
import { useOnInit } from "./hooks/useOnInit";

export const Reaction = memo((
  props: {
    children?: React.ReactNode
  }
) => {
  useOnMultiFieldValueChange();
  useOnFieldValueChange();
  useOnInit();
  
  return (
    <>
      {props.children}
    </>
  )
})
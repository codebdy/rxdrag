import { memo } from "react"
import { useOnMultiFieldValueChange } from "./hooks/useOnMultiFieldValueChange"
import { useOnFieldValueChange } from "./hooks/useOnFieldValueChange";
import { useOnInit } from "./hooks/useOnInit";
import { IReactionsMeta } from "./interfaces";

export const Reaction = memo((
  props: {
    reaction?: IReactionsMeta,
    children?: React.ReactNode
  }
) => {
  const { reaction, children } = props;
  useOnMultiFieldValueChange(reaction);
  useOnFieldValueChange(reaction);
  useOnInit(reaction);

  return (
    <>
      {children}
    </>
  )
})
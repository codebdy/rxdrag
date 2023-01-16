import { memo } from "react"
import { useOnMultiFieldValueChange } from "../../hooks/useOnMultiFieldValueChange"
import { useOnFieldValueChange } from "../../hooks/useOnFieldValueChange";
import { useOnInit } from "../../hooks/useOnInit";
import { IReactionsMeta } from "runner/reaction/metas";

export const Reactions = memo((
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
import { memo } from "react"
import { useOnMultiFieldValueChange } from "../../hooks/useOnMultiFieldValueChange"
import { useOnFieldValueChange } from "../../hooks/useOnFieldValueChange";
import { useOnInit } from "../../hooks/useOnInit";
import { IControllerMeta } from "runner/reaction/interfaces/metas";

export const Reactions = memo((
  props: {
    meta?: IControllerMeta,
    children?: React.ReactNode
  }
) => {
  const { meta, children } = props;
  useOnMultiFieldValueChange(meta);
  useOnFieldValueChange(meta);
  useOnInit(meta);

  return (
    <>
      {children}
    </>
  )
})
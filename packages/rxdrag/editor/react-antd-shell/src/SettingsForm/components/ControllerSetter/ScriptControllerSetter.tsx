import { IScriptControllerMeta } from "@rxdrag/minions-runtime-react"
import { memo } from "react"

export const ScriptControllerSetter = memo((
  props: {
    value?: IScriptControllerMeta,
    onChange?: (value?: IScriptControllerMeta) => void
  }
) => {
  const { value, onChange } = props;
  return (
    <div style={{height:"100%"}}>
      哈哈
    </div>
  )
})
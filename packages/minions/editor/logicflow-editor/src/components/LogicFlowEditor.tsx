import { memo } from "react"
import { LogicFlowEditorScope } from "./LogicFlowEditorScope";
import { LogicFlowEditorInner, LogicFlowEditorProps } from "./LogicFlowEditorInner";

export const LogicFlowEditor = memo((
  props: LogicFlowEditorProps
) => {
  return (
    <LogicFlowEditorScope>
      <LogicFlowEditorInner {...props} />
    </LogicFlowEditorScope>
  )
})
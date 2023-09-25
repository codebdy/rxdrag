import { ReactNode, memo } from "react"
import { LogicFlowEditorScope } from "./LogicFlowEditorScope";
import { LogicFlowEditorInner, LogicFlowEditorInnerProps } from "./LogicFlowEditorInner";
import { IThemeToken } from "../interfaces";
import { IActivityMaterial, ILogicFlowDefine } from "@rxdrag/minions-schema";

export type LogicFlowEditorProps = LogicFlowEditorInnerProps & {
  token: IThemeToken,
  materials: IActivityMaterial<ReactNode>[],
  logicFlowContext?: unknown,
  canBeReferencedLogflowMetas?: ILogicFlowDefine[],
}

export const LogicFlowEditor = memo((
  props: LogicFlowEditorProps
) => {
  const { token, materials, logicFlowContext, canBeReferencedLogflowMetas, ...rest } = props

  return (
    <LogicFlowEditorScope
      token={token}
      materials = {materials}
      logicFlowContext = {logicFlowContext}
      canBeReferencedLogflowMetas = {canBeReferencedLogflowMetas}
    >
      <LogicFlowEditorInner {...rest} />
    </LogicFlowEditorScope>
  )
})
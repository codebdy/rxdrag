import { ReactNode, memo } from "react"
import { LogicFlowEditorScope } from "./LogicFlowEditorScope";
import { LogicFlowEditorInner, LogicFlowEditorInnerProps } from "./LogicFlowEditorInner";
import { IThemeToken } from "../interfaces";
import { IActivityMaterial, ILogicFlowDefine } from "@rxdrag/minions-schema";

export type LogicFlowEditorProps = LogicFlowEditorInnerProps & {
  themMode?: "dark" | "light",
  token: IThemeToken,
  materials: IActivityMaterial<ReactNode>[],
  logicFlowContext?: unknown,
  canBeReferencedLogflowMetas?: ILogicFlowDefine[],
}

export const LogicFlowEditor = memo((
  props: LogicFlowEditorProps
) => {
  const { themMode, token, materials, logicFlowContext, canBeReferencedLogflowMetas, ...rest } = props

  return (
    <LogicFlowEditorScope
      themMode={themMode}
      token={token}
      materials={materials}
      logicFlowContext={logicFlowContext}
      canBeReferencedLogflowMetas={canBeReferencedLogflowMetas}
    >
      <LogicFlowEditorInner {...rest} />
    </LogicFlowEditorScope>
  )
})
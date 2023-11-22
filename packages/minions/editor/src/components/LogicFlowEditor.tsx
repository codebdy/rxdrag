import { ReactNode, memo } from "react"
import { LogicFlowEditorScope } from "./LogicFlowEditorScope";
import { LogicFlowEditorInner, LogicFlowEditorInnerProps } from "./LogicFlowEditorInner";
import { IThemeToken } from "../interfaces";
import { IActivityMaterial } from "@rxdrag/minions-schema";

export type LogicFlowEditorProps = LogicFlowEditorInnerProps & {
  themMode?: "dark" | "light",
  token: IThemeToken,
  materials: IActivityMaterial<ReactNode>[],
  logicFlowContext?: unknown,
}

export const LogicFlowEditor = memo((
  props: LogicFlowEditorProps
) => {
  const { themMode, token, materials, logicFlowContext, ...rest } = props

  return (
    <LogicFlowEditorScope
      themMode={themMode}
      token={token}
      materials={materials}
      logicFlowContext={logicFlowContext}
    >
      <LogicFlowEditorInner {...rest} />
    </LogicFlowEditorScope>
  )
})
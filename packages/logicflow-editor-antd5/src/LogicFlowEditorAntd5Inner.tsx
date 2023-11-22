import { CSSProperties, ReactNode, memo } from "react"
import { Toolbox, PropertyBox, FlowToolbar } from "./components"
import { ILogicMetas } from "@rxdrag/minions-logicflow-editor"
import { ActivityMaterialCategory, ILogicFlowDefine } from "@rxdrag/minions-schema"
import { IReactComponents } from "@rxdrag/react-shared"
import { MiniToolbar } from "./components/MiniToolbar"
import { LogicFlowEditorInner } from "./components/LogicFlowEditorInner"

export type LogicFlowEditorAntd5InnerProps = {
  value: ILogicMetas,
  onChange?: (value: ILogicMetas) => void,
  materialCategories: ActivityMaterialCategory<ReactNode>[],
  setters?: IReactComponents,
  logicFlowContext?: unknown,
  fxFlowMetas?: ILogicFlowDefine[],
  toolbar?: false | React.ReactNode,
  toolbox?: React.ReactNode | false,
  style?: CSSProperties,
  className?: string,
}

export const LogicMetaEditorAntd5Inner = memo((
  props: LogicFlowEditorAntd5InnerProps
) => {
  const { value, onChange, materialCategories, setters, toolbar, toolbox, ...rest } = props
  return (
    <LogicFlowEditorInner
      value={value}
      onChange={onChange}
      toolbar={toolbar === undefined ? <FlowToolbar /> : toolbar}
      toolbox={toolbox !== false && (toolbox || <Toolbox materialCategories={materialCategories} />)}
      propertyBox={<PropertyBox setters={setters} />}
      {...rest}
    >
      <MiniToolbar />
    </LogicFlowEditorInner>
  )
})
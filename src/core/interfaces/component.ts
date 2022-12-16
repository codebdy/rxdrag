import { IDesignerProps, INodeSchema, ITreeNode } from "./document"
import { IDesignerEngine } from "./engine"
import { ILocales } from "./loacales"
import { ID } from "./types"

export type Selector = (node: ITreeNode, engine?: IDesignerEngine) => boolean

export type IResizable = {
  width?: boolean
  height?: boolean
}

export type IMoveable = {
  x?: boolean
  y?: boolean
}

export interface IBehaviorRule {
  disabled?: boolean | ((engine?: IDesignerEngine) => boolean) //默认false
  selectable?: boolean | ((engine?: IDesignerEngine) => boolean) //是否可选中，默认为true
  droppable?: boolean | ((engine?: IDesignerEngine) => boolean) //是否可作为拖拽容器，默认为false
  draggable?: boolean | ((engine?: IDesignerEngine) => boolean) //是否可拖拽，默认为true
  deletable?: boolean | ((engine?: IDesignerEngine) => boolean) //是否可删除，默认为true
  cloneable?: boolean | ((engine?: IDesignerEngine) => boolean) //是否可拷贝，默认为true
  resizable?: IResizable | ((engine?: IDesignerEngine) => IResizable)
  moveable?: IMoveable | ((engine?: IDesignerEngine) => IMoveable)  // 可用于自由布局
  allowChild?: (target: ITreeNode, engine?: IDesignerEngine,) => boolean
  allowAppendTo?: (target: ITreeNode, engine?: IDesignerEngine,) => boolean
  allowSiblingsTo?: (target: ITreeNode, engine?: IDesignerEngine,) => boolean
}

export interface IDesignerParams {
  [key: string]: any
}

export interface IComponentConfig {
  componentName: string
  behaviorRule?: IBehaviorRule
  designerSchema?: INodeSchema
  designerLocales?: ILocales
  designerProps?: IDesignerProps
  designerParams?: IDesignerParams
}

//可独立注册的行为规则
export interface IBehavior {
  //唯一名称防止重复注册
  name: string
  selector: string | Selector
  rule: IBehaviorRule
}

export interface IComponentManager {
  getBehaviorRule(nodeId: ID): IBehaviorRule | undefined
  getComponentDesigner(componentName: string): IComponentConfig | undefined
  registerComponents(...componentDesigners: IComponentConfig[]): void
  registerBehaviors(...behaviors: IBehavior[]): void
  removeBehaviors(...names: string[]): void
  setBehaviors(...behaviors: IBehavior[]): void
}
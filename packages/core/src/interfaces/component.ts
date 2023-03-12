import { IDesignerProps, INodeSchema, ITreeNode } from "./document"
import { IDesignerEngine } from "./engine"
import { ILocales } from "./loacales"
import { IResource } from "./resource"
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

export type AbleCheckFunction = ((nodeId: ID, engine?: IDesignerEngine) => boolean)

export interface IBehaviorRule {
  disabled?: boolean | AbleCheckFunction //默认false
  selectable?: boolean | AbleCheckFunction //是否可选中，默认为true
  droppable?: boolean | AbleCheckFunction//是否可作为拖拽容器，默认为false
  draggable?: boolean | AbleCheckFunction //是否可拖拽，默认为true
  deletable?: boolean | AbleCheckFunction //是否可删除，默认为true
  cloneable?: boolean | AbleCheckFunction //是否可拷贝，默认为true
  resizable?: IResizable | ((engine?: IDesignerEngine) => IResizable)
  moveable?: IMoveable | ((engine?: IDesignerEngine) => IMoveable)  // 可用于自由布局
  allowChild?: (target: ITreeNode, engine?: IDesignerEngine,) => boolean
  allowAppendTo?: (target: ITreeNode, engine?: IDesignerEngine,) => boolean
  allowSiblingsTo?: (target: ITreeNode, engine?: IDesignerEngine,) => boolean
  noPlaceholder?: boolean,
  noRef?: boolean,
  lockable?: boolean,
}

// export interface IDesignerParams {
//   locked?: boolean,
//   [key: string]: any
// }

export interface IComponentConfig<ComponentType = any> {
  packageName?: string //npm包名 生成代码用
  componentName: string
  component: ComponentType,
  designer: ComponentType,
  behaviorRule?: IBehaviorRule
  designerSchema?: INodeSchema
  designerLocales?: ILocales
  designerProps?: IDesignerProps
  //designerParams?: IDesignerParams
  resource?: IResource
  //slots用到的组件，值为true时，用缺省组件DefaultSlot, string时，存的是已经注册过的component resource名字
  slots?: {
    [name: string]: IComponentConfig | true | string | undefined
  },
  //自定义属性面板用的多语言资源
  toolsLocales?: ILocales
  tools?: {
    [name: string]: ComponentType | undefined
  },
}

//可独立注册的行为规则
export interface IBehavior {
  //唯一名称防止重复注册
  name: string
  selector: string | Selector
  rule: IBehaviorRule
}

export interface IComponentManager {
  getNodeBehaviorRules(nodeId: ID): IBehaviorRule[]
  getComponentDesigner(componentName: string): IComponentConfig | undefined
  registerComponents(...componentDesigners: IComponentConfig[]): void
  registerBehaviors(...behaviors: IBehavior[]): void
  removeBehaviors(...names: string[]): void
  setBehaviors(...behaviors: IBehavior[]): void
}
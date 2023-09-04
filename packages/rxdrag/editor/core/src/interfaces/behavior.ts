import { ID, Listener, Unsubscribe } from "@rxdrag/shared"
import { ITreeNode } from "./document"
import { IDesignerEngine } from "./engine"

export type Selector = (node: ITreeNode, engine?: IDesignerEngine) => boolean

export type IResizable = {
  width?: boolean
  height?: boolean
  //百分比计算大小
  percent?: boolean
}

export type IMoveable = {
  left?: boolean
  top?: boolean
  //百分比计算位置
  percent?: boolean
}
export type RuleValue = boolean | undefined | IResizable | IMoveable;

export type AbleCheckFunction = ((nodeId: ID, engine?: IDesignerEngine) => RuleValue)

export interface IBehaviorRule {
  disabled?: boolean | AbleCheckFunction //默认false
  selectable?: boolean | AbleCheckFunction //是否可选中，默认为true
  droppable?: boolean | AbleCheckFunction//是否可作为拖拽容器，默认为false
  draggable?: boolean | AbleCheckFunction //是否可拖拽，默认为true
  deletable?: boolean | AbleCheckFunction //是否可删除，默认为true
  cloneable?: boolean | AbleCheckFunction //是否可拷贝，默认为true
  resizable?: IResizable | AbleCheckFunction//可调整大小
  moveable?: IMoveable | AbleCheckFunction // 可移动，可用于自由布局
  equalRatio?: boolean | AbleCheckFunction //是否等比，用于自由布局
  rotatable?: boolean | AbleCheckFunction //是否可旋转，用于自由布局
  allowChild?: (target: ITreeNode, engine?: IDesignerEngine,) => boolean
  allowAppendTo?: (target: ITreeNode, engine?: IDesignerEngine,) => boolean
  allowSiblingsTo?: (target: ITreeNode, engine?: IDesignerEngine,) => boolean
  noPlaceholder?: boolean,
  noRef?: boolean,
  lockable?: boolean,
}


//可独立注册的行为规则
export interface IBehavior {
  //唯一名称防止重复注册
  name: string
  selector: string | Selector
  rule: IBehaviorRule
}

export interface IBehaviorManager {
  getNodeBehaviorRules(nodeId: string): IBehaviorRule[]
  setBehaviors(...behaviors: IBehavior[]): void
  registerBehaviors(...behaviors: IBehavior[]): void
  removeBehaviors(...names: string[]): void
  subscribeBehaviorsChange: (listener: Listener<Record<string, IBehavior | undefined>>) => Unsubscribe
}
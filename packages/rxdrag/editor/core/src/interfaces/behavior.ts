import { Listener, Unsubscribe } from "@rxdrag/shared"
import { ITreeNode } from "./document"
import { IDesignerEngine } from "./engine"
import { IResource } from "./resource"

export type Selector = (node: ITreeNode | undefined, engine?: IDesignerEngine) => boolean

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

export type CheckOptions = {
  node?: ITreeNode,
  resource?: IResource,
  //类似allowPpendTo用
  target?: ITreeNode,
}

export type AbleCallback<T = boolean> = T | ((options: CheckOptions, engine?: IDesignerEngine) => T)

export interface IBehaviorRule {
  disabled?: AbleCallback //默认false
  selectable?: AbleCallback //是否可选中，默认为true
  droppable?: AbleCallback//是否可作为拖拽容器，默认为false
  draggable?: AbleCallback //是否可拖拽，默认为true
  deletable?: AbleCallback //是否可删除，默认为true
  cloneable?: AbleCallback //是否可拷贝，默认为true
  resizable?: AbleCallback<IResizable>//可调整大小
  moveable?: AbleCallback<IMoveable> // 可移动，可用于自由布局
  equalRatio?: AbleCallback //是否等比，用于自由布局
  rotatable?: AbleCallback //是否可旋转，用于自由布局
  allowChild?: AbleCallback
  allowAppendTo?: AbleCallback
  allowSiblingsTo?: AbleCallback
  noPlaceholder?: AbleCallback,
  noRef?: AbleCallback,
  lockable?: AbleCallback,
}

//可独立注册的行为规则
export interface IBehavior {
  //唯一名称防止重复注册
  name: string
  //选择器， string表示ComponentName
  selector: string | Selector
  //规则
  rule: IBehaviorRule
  //优先级，default 是0，值越大优先级越高，有限级大的会覆盖优先级低的，
  //单项覆盖，而不是整体覆盖
  priority?: number
}

export interface IBehaviorManager {
  getNodeBehaviorRules(nodeId: string): IBehaviorRule[]
  setBehaviors(...behaviors: IBehavior[]): void
  registerBehaviors(...behaviors: IBehavior[]): void
  removeBehaviors(...names: string[]): void
  subscribeBehaviorsChange: (listener: Listener<Record<string, IBehavior | undefined>>) => Unsubscribe
}
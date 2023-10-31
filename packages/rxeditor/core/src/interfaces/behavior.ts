import { ID, Listener, Unsubscribe } from "@rxdrag/shared"
import { ITreeNode } from "./document"
import { IDesignerEngine } from "./engine"
import { IResource } from "./resource"

export type SelectorSource = {
  node?: ITreeNode,
  resource?: IResource,
  componentName?: string,
}

export type Selector = (source: SelectorSource, engine?: IDesignerEngine) => boolean

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
  //当前节点
  node?: ITreeNode,
  componentName?: string,
  //类似allowPpendTo用
  target?: ITreeNode,
}

export type AbleCallback<Options = unknown, T = boolean> = ((source: Options | undefined, engine?: IDesignerEngine) => T)
export type AbleType<Options = unknown, T = boolean> = T | AbleCallback<Options, T>

export type CompareSource = {
  node?: ITreeNode,
  targetNode?: ITreeNode,
  targetResource?: IResource,
  targetComponent?: string,
}

//resouce跟node都可以有behavior
export interface IBehaviorRule {
  freedomContainer?: AbleType<ITreeNode>  //自由布局容器
  disabled?: AbleType<ITreeNode> //默认false
  selectable?: AbleType<ITreeNode>  //是否可选中，默认为true
  droppable?: AbleType<ITreeNode> //是否可作为拖拽容器，默认为false
  draggable?: AbleType<ITreeNode>  //是否可拖拽，默认为true
  deletable?: AbleType<ITreeNode>  //是否可删除，默认为true
  cloneable?: AbleType<ITreeNode>  //是否可拷贝，默认为true
  // resizable?: AbleType<ITreeNode, IResizable>//可调整大小
  // moveable?: AbleType<ITreeNode, IMoveable> // 可移动，可用于自由布局
  equalRatio?: AbleType<ITreeNode>  //是否等比，用于自由布局
  rotatable?: AbleType<ITreeNode>  //是否可旋转，用于自由布局
  allowChild?: AbleType<CompareSource>
  allowAppendTo?: AbleType<CompareSource>
  allowSiblingsTo?: AbleType<CompareSource>
  noPlaceholder?: AbleType<ITreeNode>,
  noRef?: AbleType<ITreeNode>,
  lockable?: AbleType<ITreeNode>,
}


export interface IBehavior {
  freedomContainer: () => boolean //自由拖放容器， 默认false
  disabled: () => boolean //默认false
  selectable: () => boolean  //是否可选中，默认为true
  droppable: () => boolean //是否可作为拖拽容器，默认为false
  draggable: () => boolean  //是否可拖拽，默认为true
  deletable: () => boolean  //是否可删除，默认为true
  cloneable: () => boolean //是否可拷贝，默认为true
  // resizable: () => IResizable | undefined//可调整大小
  // moveable: () => IMoveable | undefined // 可移动，可用于自由布局
  equalRatio: () => boolean //是否等比，用于自由布局
  rotatable: () => boolean //是否可旋转，用于自由布局
  allowChild: (options?: CompareSource) => boolean
  allowAppendTo: (options?: CompareSource) => boolean
  allowSiblingsTo: (options?: CompareSource) => boolean
  noPlaceholder: () => boolean
  noRef: () => boolean
  lockable: () => boolean
}

//可独立注册的行为规则
export interface IBehaviorSchema {
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
  setBehaviors(...behaviors: IBehaviorSchema[]): void
  registerBehaviors(...behaviors: IBehaviorSchema[]): void
  removeBehaviors(...names: string[]): void
  subscribeBehaviorsChange: (listener: Listener<Record<string, IBehaviorSchema | undefined>>) => Unsubscribe
  //返回根据优先级合并后的Behavior rule
  getNodeBehavior(nodeId: ID): IBehavior
  //返回根据优先级合并后的Behavior rule
  getComponentBehavior(componentName: string): IBehavior
  //返回根据优先级合并后的Behavior rule，可用于toolbox的动作
  getResourceBehavior(reource: IResource): IBehavior

  //判断一组节点是否是可以移动的
  // isMoveable(nodeIds: string[]): boolean
  // //判断一组节点是否可以调整大小
  // isResizable(nodeIds: string[]): boolean
}


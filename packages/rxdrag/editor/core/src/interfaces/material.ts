import { INodeSchema } from "@rxdrag/schema"
import { ILocales } from "@rxdrag/locales"
import { IDesignerProps } from "./document"
import { IResource } from "./resource"
import { Listener, Unsubscribe } from "@rxdrag/shared"
import { IBehaviorRule } from "./behavior"

export interface IComponentMaterial<ComponentType = unknown, IconType = unknown, ControllerMaterial = unknown> {
  package?: string //npm包名 生成代码用
  version?: string // npm包版本 生成代码用
  componentName: string
  component: ComponentType,
  designer: ComponentType,
  behaviorRule?: IBehaviorRule
  propsSchema?: INodeSchema
  designerLocales?: ILocales
  designerProps?: IDesignerProps
  resource?: IResource<IconType>
  //slots用到的组件，值为true时，用缺省组件DefaultSlot, string时，存的是已经注册过的component resource名字
  slots?: {
    [name: string]: IComponentMaterial | true | string | undefined
  },
  //自定义属性面板用的多语言资源
  setterLocales?: ILocales
  setters?: {
    [name: string]: ComponentType | undefined
  },
  //可被编排的属性列表，用于逻辑编排属性板下拉提示
  //后面要删除
  logicalProps?: string[] //| { value: string, label?: string }[]

  //控制器物料
  controller?: ControllerMaterial
}

export interface IComponentManager<ComponentType = unknown> {
  getComponentConfig(componentName: string): IComponentMaterial<ComponentType> | undefined
  getAllComponentConfigs(): Record<string, IComponentMaterial<ComponentType> | undefined> | undefined
  registerComponents(...componentDesigners: IComponentMaterial<ComponentType>[]): void
  subscribeComponentsChange: (listener: Listener<Record<string, IComponentMaterial<ComponentType> | undefined>>) => Unsubscribe
}
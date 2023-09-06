import { INodeSchema } from "@rxdrag/schema"
import { ILocales } from "@rxdrag/locales"
import { IDesignerProps } from "./document"
import { IResource } from "./resource"
import { Listener, Unsubscribe } from "@rxdrag/shared"
import { IBehaviorRule } from "./behavior"

export interface IComponentConfig<ComponentType = unknown, IconType = unknown> {
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
    [name: string]: IComponentConfig | true | string | undefined
  },
  //自定义属性面板用的多语言资源
  setterLocales?: ILocales
  setters?: {
    [name: string]: ComponentType | undefined
  },
  //可被编排的属性列表，用于逻辑编排属性板下拉提示
  logicalProps?: string[] //| { value: string, label?: string }[]
}

export interface IComponentManager<ComponentType = unknown> {
  getComponentConfig(componentName: string): IComponentConfig<ComponentType> | undefined
  getAllComponentConfigs(): Record<string, IComponentConfig<ComponentType> | undefined> | undefined
  registerComponents(...componentDesigners: IComponentConfig<ComponentType>[]): void
  subscribeComponentsChange: (listener: Listener<Record<string, IComponentConfig<ComponentType> | undefined>>) => Unsubscribe
}
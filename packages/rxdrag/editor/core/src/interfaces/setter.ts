import { ISubscribableRecord } from "@rxdrag/shared"


export interface ISetterComponents<ComponentType = unknown> {
  [name: string]: ComponentType | undefined
}

export interface ISetterManager<ComponentType = unknown> extends ISubscribableRecord<ComponentType> {
  registerSetters: (...settersList: ISetterComponents<ComponentType>[]) => void
}

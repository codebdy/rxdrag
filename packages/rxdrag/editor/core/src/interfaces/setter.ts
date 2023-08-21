import { ISubscribable } from "@rxdrag/shared"

export interface ISetterComponents<ComponentType = unknown> {
  [name: string]: ComponentType | undefined
}

export interface ISetterManager<ComponentType = unknown> extends ISubscribable<Record<string, ComponentType | undefined>> {
  getSetters: () => Record<string, ComponentType | undefined>
  registerSetters: (...settersList: ISetterComponents<ComponentType>[]) => void
}



export interface ISetterComponents<ComponentType = unknown> {
  [name: string]: ComponentType | undefined
}

export interface ISetterManager<ComponentType = unknown> {
  setters: ISetterComponents<ComponentType>,
  registerSetters: (...settersList: ISetterComponents<ComponentType>[]) => void
}

import { ISetterComponents, ISetterManager } from "../interfaces/setter";

export class SetterManager<ComponentType = unknown> implements ISetterManager<ComponentType>{
  setters: ISetterComponents<ComponentType> = {};
  registerSetters = (...settersList: ISetterComponents<ComponentType>[]) => {
    for (const setters of settersList) {
      this.setters = { ...this.setters, ...setters }
    }
  }
}
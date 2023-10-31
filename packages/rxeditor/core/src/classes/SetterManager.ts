import { Listener, Subscriber } from "@rxdrag/shared";
import { ISetterComponents, ISetterManager } from "../interfaces/setter";

export class SetterManager<ComponentType = unknown> implements ISetterManager<ComponentType>{
  private setters = new Subscriber<Record<string, ComponentType | undefined>>({})

  getSetters = () => {
    return this.setters.getValue()
  };

  subscribeChange = (listener: Listener<Record<string, ComponentType | undefined>>) => {
    return this.setters.subscribeChange(listener)
  };

  registerSetters = (...settersList: ISetterComponents<ComponentType>[]) => {
    let news = { ...this.setters.getValue() }
    for (const setters of settersList) {
      news = { ...news, ...setters }
    }
    this.setters.setValue(news)
  }
}
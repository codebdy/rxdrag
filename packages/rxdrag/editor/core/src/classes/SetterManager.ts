import { SubscribableRecord } from "@rxdrag/shared";
import { ISetterComponents, ISetterManager } from "../interfaces/setter";

export class SetterManager<ComponentType = unknown> extends SubscribableRecord<ComponentType> implements ISetterManager<ComponentType>{
  registerSetters = (...settersList: ISetterComponents<ComponentType>[]) => {
    for (const setters of settersList) {
      this.record = { ...this.record, ...setters }
    }
  }
}
import { ISubscribableRecord, Listener } from "./interfaces";

export class SubscribableRecord<T = unknown> implements ISubscribableRecord<T>{
  protected record: Record<string, T | undefined> = {}
  protected listeners: Listener<Record<string, T | undefined>>[] = []

  getRecord(): Record<string, T | undefined> {
    return this.record
  }

  emitChange = () => {
    for (const listener of this.listeners) {
      listener(this.record)
    }
  }

  subscribeChange = (listener: Listener<Record<string, T | undefined>>) => {
    this.listeners.push(listener)

    return () => {
      this.listeners.splice(this.listeners.indexOf(listener), 1)
    }
  }
}
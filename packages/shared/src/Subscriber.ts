import { ISubscribable, Listener } from "./interfaces";

export class Subscriber<T = unknown> implements ISubscribable<T>{
  protected value: T
  protected listeners: Listener<T>[] = []

  constructor(value: T) {
    this.value = value
  }

  getValue(): T {
    return this.value
  }

  reset(value: T) {
    this.value = value
  }

  setValue(value: T) {
    this.value = value
    this.emitChange()
  }

  emitChange = () => {
    for (const listener of this.listeners) {
      listener(this.value)
    }
  }

  subscribeChange = (listener: Listener<T>) => {
    this.listeners.push(listener)

    return () => {
      this.listeners.splice(this.listeners.indexOf(listener), 1)
    }
  }
}
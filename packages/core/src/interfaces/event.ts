
import { isFn } from "core/utils/types"
import _ from "lodash"
import { Unsubscribe } from "./types"

export interface ICustomEvent<EventData = any> {
  type: string
  data?: EventData
}
export interface CustomEventClass {
  new(...args: any[]): any
}

export interface ISubscriber<EventType = any> {
  (payload: EventType): void | boolean
}

export interface IDispatchable<T> {
  dispatch(event: T): void | boolean
}

export interface ISubscribable {
  subscribeTo<T extends CustomEventClass>(
    type: T,
    subscriber: ISubscriber<InstanceType<T>>
  ): Unsubscribe,
}

export abstract class EventEngine<EventType extends CustomEventClass = any> implements IDispatchable<EventType>, ISubscribable {
  private subscribers: {
    [key: string]: ISubscriber
  } = {}

  dispatch<T extends EventType = any>(event: T, context?: any) {
    let interrupted = false;
    for (const key in this.subscribers) {
      if (isFn(this.subscribers[key])) {
        if (this.subscribers[key](event) === false) {
          interrupted = true
        }
      }
    }

    return interrupted ? false : true
  }

  subscribeTo<T extends CustomEventClass>(
    type: T,
    subscriber: ISubscriber<InstanceType<T>>
  ) {
    return this.subscribe((event) => {
      if (type && event instanceof type) {
        return subscriber(event)
      }
    })
  }

  private subscribe(subscriber: ISubscriber) {
    const id = _.uniqueId()
    if (isFn(subscriber)) {
      this.subscribers[id] = subscriber
    }

    const unsubscribe: Unsubscribe = () => {
      this.unsubscribe(id)
    }

    return unsubscribe
  }

  private unsubscribe = (id: string) => {
    if (this.subscribers[id]) {
      delete this.subscribers[id]
    }
  }
}

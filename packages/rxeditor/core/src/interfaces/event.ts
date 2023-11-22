
import _ from "lodash"
import { isFn } from "@rxdrag/shared"
import { Unsubscribe } from "./types"

export interface ICustomEvent<EventData = unknown> {
  name: string
  data?: EventData
}
// export interface CustomEventClass {
//   new(...args: any[]): any
// }

export interface IListener<EventType = unknown> {
  (event: EventType): void | boolean
}

export interface IDispatchable<T> {
  dispatch(event: T): void | boolean
}

export interface ISubscribable {
  subscribeTo<EventType extends ICustomEvent = ICustomEvent>(
    type: string,
    subscriber: IListener<EventType>
  ): Unsubscribe,
}

export abstract class EventEngine<EventType extends ICustomEvent = ICustomEvent> implements IDispatchable<EventType>, ISubscribable {
  private subscribers: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: IListener<any>
  } = {}

  dispatch(event: EventType) {
    for (const key in this.subscribers) {
      if (isFn(this.subscribers[key])) {
        this.subscribers[key](event)
      }
    }
  }

  subscribeTo<T extends ICustomEvent = EventType>(
    name: string,
    subscriber: IListener<T>
  ) {
    return this.subscribe<T>((event: T) => {
      if (name && event.name === name) {
        return subscriber(event)
      }
    })
  }

  private subscribe<T>(subscriber: IListener<T>) {
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

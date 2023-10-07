/* eslint-disable @typescript-eslint/no-explicit-any */
import { IControllerMeta } from "../interfaces";
import { IController, EventHandlers, PropsListener, UnListener, PropListener, EventListener, CONTROLLER_EVENT_INIT, CONTROLLER_EVENT_DESTORY } from "../interfaces/controller";

export const DefaultControllerName = "DefaultController"

export class DefaultController implements IController {
  id: string;
  name?: string;
  events: EventHandlers = {};
  protected props: any = {};

  protected propListeners: {
    [name: string]: PropListener[]
  } = {}

  protected eventListeners: {
    [name: string]: EventListener[]
  } = {}

  protected propsListeners: PropsListener[] = []

  constructor(public meta: IControllerMeta) {
    this.id = meta.id
    this.name = meta.name
  }

  initEvent = (args?: unknown[]) => {
    for (const eventHandler of this.eventListeners?.[CONTROLLER_EVENT_INIT]) {
      eventHandler(args)
    }
  }

  destroyEvent = (args?: unknown[]) => {
    for (const eventHandler of this.eventListeners?.[CONTROLLER_EVENT_DESTORY]) {
      eventHandler(args)
    }
  }

  setProp = (name: string, value: any): void => {
    this.props[name] = value;
    //综合通知
    for (const listener of this.propsListeners) {
      listener(name, this.props[name])
    }

    //逐个通知
    const listeners = this.propListeners[name] || []
    for (const listener of listeners) {
      listener(value)
    }
  }

  getProp(name: string): unknown {
    return this.props[name]
  }

  subscribeToPropChange(name: string, listener: PropListener): UnListener {
    if (!this.propListeners[name]) {
      this.propListeners[name] = []
    }
    this.propListeners[name].push(listener)
    return () => {
      this.propListeners[name].splice(this.propListeners[name].indexOf(listener), 1)
    }
  }

  subscribeToPropsChange = (listener: PropsListener): UnListener => {
    this.propsListeners.push(listener)
    return () => {
      this.propsListeners.splice(this.propsListeners.indexOf(listener), 1)
    }
  }

  subscribeToEvent(name: string, listener: EventListener): UnListener {
    if (!this.eventListeners[name]) {
      this.eventListeners[name] = []
    }
    this.eventListeners[name].push(listener)
    return () => {
      this.eventListeners[name].splice(this.eventListeners[name].indexOf(listener), 1)
    }
  }

  destroy(): void {
    //throw new Error("Method not implemented.");
  }
}

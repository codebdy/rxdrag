/* eslint-disable @typescript-eslint/no-explicit-any */
import { IForm, IField } from "@rxdrag/fieldy";
import { IControllerMeta } from "../interfaces";
import { IController, PropsListener, UnListener, PropListener, EventListener, CONTROLLER_EVENT_INIT, CONTROLLER_EVENT_DESTORY, EventsChangeListener, EventHandler } from "../interfaces/controller";

export class ComponentController implements IController {
  id: string;
  name?: string;
  protected props: any = {};
  events?: Record<string, EventHandler>

  protected propListeners: Record<string, PropListener[]> = {}
  protected eventListeners: Record<string, EventListener[]> = {}
  protected eventHandlersListeners: EventsChangeListener[] = []

  protected propsListeners: PropsListener[] = []

  constructor(public meta: IControllerMeta, public fieldyNode?: IForm | IField) {
    this.id = meta.id
    this.name = meta.name
  }

  initEvent = (args?: unknown[]) => {
    for (const eventHandler of this.eventListeners?.[CONTROLLER_EVENT_INIT] || []) {
      eventHandler(args)
    }
  }

  destroyEvent = (args?: unknown[]) => {
    for (const eventHandler of this.eventListeners?.[CONTROLLER_EVENT_DESTORY] || []) {
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

  getProps(): object | undefined {
    return this.props;
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

  subscribeToEvent = (name: string, listener: EventListener): UnListener => {
    if (!this.eventListeners[name]) {
      this.eventListeners[name] = []
    }
    this.eventListeners[name].push(listener)
    this.emitEvhentHandlers()
    return () => {
      this.unsubscribeEvent(name, listener)
    }
  }

  unsubscribeEvent = (name: string, listener: EventListener): void => {
    this.eventListeners[name].splice(this.eventListeners[name].indexOf(listener), 1)
    this.emitEvhentHandlers()
  }

  emitEvhentHandlers = () => {
    this.events = {}
    for (const name of Object.keys(this.eventListeners)) {
      this.events[name] = (...args: unknown[]) => {
        const listeners = this.eventListeners[name]
        for (const listener of listeners) {
          listener(args)
        }
      }
    }

    for (const listener of this.eventHandlersListeners) {
      listener(this.events)
    }
  }

  subscribeEventHandlersChange(listener: EventsChangeListener): UnListener {
    this.eventHandlersListeners.push(listener)
    return () => {
      this.eventHandlersListeners.splice(this.eventHandlersListeners.indexOf(listener), 1)
    }
  }

  destroy(): void {
    //throw new Error("Method not implemented.");
  }

}

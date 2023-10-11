import { IController, UnListener } from "@rxdrag/minions-runtime-react";
import { ControllerEngine } from "../ControllerEngine";

if (typeof Proxy == "undefined") {
  throw new Error("This browser doesn't support Proxy");
}

export const getProxyHandler = (target: ScriptController, name: string, receiver: unknown) => {
  if (Reflect.has(target, name)) {
    return Reflect.get(target, name, receiver);
  }

  const reaction = target.controllerEngine?.reactions?.[name]
  if (reaction) {
    return (value?: unknown) => {
      return reaction(target.controller, value)
    }
  } else {
    console.error("Can not find react on controller", target.controllerEngine, target.name, name)
  }
}

export type EventHandler = (args?: unknown[]) => void

export class ScriptController {
  unListeners: UnListener[] = [];

  constructor(public name: string,
    public controller: IController,
    public controllerEngine: ControllerEngine | null,
  ) { }

  on = (name: string | undefined, handler: EventHandler) => {
    if (name) {
      const unListerner = this.controller.subscribeToEvent(name, handler)
      this.unListeners.push(unListerner)
      return unListerner
    }
  }

  off = (name: string | undefined, handler: EventHandler) => {
    if (name) {
      return this.controller.unsubscribeEvent(name, handler)
    }
  }

  setProp = (name: string | undefined, value: unknown) => {
    if (name) {
      this.controller.setProp(name, value)
    }
  }

  dispose = () => {
    for (const unlistener of this.unListeners) {
      unlistener?.()
    }
    this.unListeners = []
  }
}
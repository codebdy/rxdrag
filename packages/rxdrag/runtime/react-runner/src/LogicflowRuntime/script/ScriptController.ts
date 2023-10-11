import { IController } from "@rxdrag/minions-runtime-react";
import { ControllerEngine } from "../ControllerEngine";

if (typeof Proxy == "undefined") {
  throw new Error("This browser doesn't support Proxy");
}

export const getProxyHandler = (target: ScriptController, name: string, receiver: unknown) => {
  if (Reflect.has(target, name)) {
    console.log("Getting non-existent property '" + name + "'");
    return Reflect.get(target, name, receiver);
  }

  const reaction = target.controllerEngine?.reactions?.[name]
  console.log("====>get", name, reaction)
  if (reaction) {
    return (value?: unknown) => {
      reaction(target.controller, value)
    }
  } else {
    console.error("Can not find react on controller", target.controllerEngine, target.name, name)
  }
}

export class ScriptController {

  constructor(public name: string,
    public controller: IController,
    public controllerEngine: ControllerEngine | null,
  ) { }

  on = (name?: string) => {
    console.log("===>on")
  }

  off = (name?: string) => {
    console.log("===>off")
  }

  dispose = () => {
    //
  }
}
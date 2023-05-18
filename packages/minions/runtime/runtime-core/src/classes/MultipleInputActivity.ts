import { IActivityDefine } from "@rxdrag/minions-schema";
import { AbstractActivity } from "./AbstractActivity";
import { InputHandler } from "../interfaces";

export class MultipleInputActivity<ConfigMeta> extends AbstractActivity<ConfigMeta>{
  handlers: {
    [name: string]: InputHandler | undefined
  } = {}
  constructor(meta: IActivityDefine<ConfigMeta>) {
    super(meta)
  }

  connect = (): void => {
    for (const input of this.meta.inPorts || []) {
      const handler = this.handlers[input.name]
      if (!handler) {
        throw new Error("Connect error, can not find input handler")
      }
      this.jointers.getInput(input.name)?.connect(handler)
    }
  }

  registerHandler = (name: string, handler: InputHandler) => {
    this.handlers[name] = handler;
  }

  next = (inputValue: unknown, outputName: string = "output") => {
    this.jointers.getInput(outputName)?.push(inputValue)
  }
}
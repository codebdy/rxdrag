import { IVariableController } from "@rxdrag/minions-runtime-react";

export class ScriptVariables {
  constructor(private variablesController?: IVariableController) { }

  get = (name?: string) => {
    console.log("===>ScriptVariables get", name)
  }

  set = (name?: string, value?: unknown) => {
    console.log("===>ScriptVariables set", name, value)
  }

  on = (name?: string) => {
    console.log("===>ScriptVariables on", name)
  }

  off = (name?: string) => {
    console.log("===>ScriptVariables off", name)
  }

  dispose = () => {
    //
  }
}
import { IVariableController, UnListener, VariableListener } from "@rxdrag/minions-runtime-react";

export class ScriptVariables {
  unListeners: UnListener[] = [];

  constructor(private variablesController?: IVariableController) { }

  get = (name?: string) => {
    if (name) {
      return this.variablesController?.getVariable(name)
    }
  }

  set = (name?: string, value?: unknown) => {
    if (name) {
      this.variablesController?.setVariable(name, value)
    }
  }

  on = (name: string | undefined, listener: VariableListener) => {
    if (name) {
      const unListerner = this.variablesController?.subscribeToVariableChange(name, listener)
      if (unListerner) {
        this.unListeners.push(unListerner)
      }
      return unListerner
    }
  }

  off = (name: string | undefined, listener: VariableListener) => {
    if (name) {
      return this.variablesController?.unsubscribeVariableChange(name, listener)
    }
  }

  dispose = () => {
    for (const unlistener of this.unListeners) {
      unlistener?.()
    }
    this.unListeners = []
  }
}
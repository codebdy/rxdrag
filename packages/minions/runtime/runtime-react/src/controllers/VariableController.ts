import { IVariable } from "@rxdrag/minions-schema";
import { IVariableController, UnListener, VariableListener } from "../interfaces";

export class VariableController implements IVariableController {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected variables: any = {};

  protected variableListeners: {
    [name: string]: VariableListener[]
  } = {}

  constructor(variableMetas?: IVariable[]) {
    this.setMetas(variableMetas)
  }

  setMetas = (variableMetas?: IVariable[]) => {
    for (const meta of variableMetas || []) {
      this.variables[meta.name] = meta.defaultValue
    }
  }

  setVariable = (name: string, value: unknown): void => {
    this.variables[name] = value
    const listeners = this.variableListeners[name] || []
    for (const listener of listeners) {
      listener(value)
    }
  }
  getVariable = (name: string): unknown => {
    return this.variables[name]
  }
  subscribeToVariableChange = (name: string, listener: VariableListener): UnListener => {
    if (!this.variableListeners[name]) {
      this.variableListeners[name] = []
    }
    listener?.(this.variables[name])
    this.variableListeners[name].push(listener)
    return () => {
      this.unsubscribeVariableChange(name, listener)
    }
  }

  unsubscribeVariableChange = (name: string, listener: VariableListener): void => {
    this.variableListeners[name].splice(this.variableListeners[name].indexOf(listener), 1)
  }

}
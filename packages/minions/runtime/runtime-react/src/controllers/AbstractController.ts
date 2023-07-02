/* eslint-disable @typescript-eslint/no-explicit-any */
import { IController, EventFunc, EventFuncs, VariableListener, PropsListener, UnListener, PropListener, Controllers } from "../interfaces/controller";
import { ILogicFlowControllerMeta } from "../interfaces";


export abstract class AbstractController implements IController {
  id: string;
  name?: string;
  protected isInitialized?: boolean;
  initEvent?: EventFunc | undefined;
  destoryEvent?: EventFunc | undefined;
  events: EventFuncs = {};
  protected variables: any = {};
  protected props: any = {};
  protected variableListeners: {
    [name: string]: VariableListener[]
  } = {}

  protected propListeners: {
    [name: string]: PropListener[]
  } = {}

  protected propsListeners: PropsListener[] = []

  constructor(public meta: ILogicFlowControllerMeta) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.id = meta.id!
  }

  abstract init(controllers: Controllers, context: unknown):void 
  abstract destory(): void

  getVariable(name: string) {
    return this.variables[name]
  }

  setVariable = (name: string, value: any): void => {
    this.variables[name] = value
    const listeners = this.variableListeners[name] || []
    for (const listener of listeners) {
      listener(value)
    }
  }

  subscribeToVariableChange = (name: string, listener: VariableListener): UnListener => {
    if (!this.variableListeners[name]) {
      this.variableListeners[name] = []
    }
    this.variableListeners[name].push(listener)
    return () => {
      this.variableListeners[name].splice(this.variableListeners[name].indexOf(listener), 1)
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
}

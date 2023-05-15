/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  IController,
  InputFunc,
  VariableListener,
  EventFuncs,
  PropsListener,
  Controllers,
  IActivityFactoryOptions,
  INIT_EVENT_NAME,
  DESTORY_EVENT_NAME,
  UnListener,
  GraphicalActivity
} from "@rxdrag/minions"
import { IActivity, IControllerMeta, ILogicFlowDefinition } from "@rxdrag/schema";

export class DefaultController implements IController {
  id: string;
  name?: string;
  initEvent?: InputFunc | undefined;
  destoryEvent?: InputFunc | undefined;
  events: EventFuncs = {};
  private variables: any = {};
  private variableListeners: {
    [name: string]: VariableListener[]
  } = {}
  private propsListeners: PropsListener[] = []

  private reactions: IActivity[] = []

  constructor(public meta: IControllerMeta, protected parentControllers: Controllers, protected options?: IActivityFactoryOptions) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.id = meta.id!
    for (const eventMeta of meta.events || []) {
      const reaction = this.makeReaction(eventMeta, { ...parentControllers, [this.id]: this })
      reaction && this.reactions.push(reaction)
      if (!reaction) {
        continue
      }
      const inputOne = reaction.inputs[0]
      if (!inputOne) {
        continue
      }
      if (eventMeta.name === INIT_EVENT_NAME) {
        this.initEvent = inputOne.push
      } else if (eventMeta.name === DESTORY_EVENT_NAME) {
        this.destoryEvent = inputOne.push
      } else if (eventMeta.name) {
        this.events[eventMeta.name] = inputOne.push
      }
    }
    for (const variable of meta.variables || []) {
      this.variables[variable.name] = variable.defaultValue
    }
  }
  getVariable(name: string) {
    return this.variables[name]
  }

  destory = () => {
    for (const reaction of this.reactions) {
      reaction.destory()
    }
    this.reactions = []
    this.events = {}
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
    for (const listener of this.propsListeners) {
      listener(name, value)
    }
  }

  subscribeToPropsChange = (listener: PropsListener): UnListener => {
    this.propsListeners.push(listener)
    return () => {
      this.propsListeners.splice(this.propsListeners.indexOf(listener), 1)
    }
  }

  private makeReaction = (reactionMeta: ILogicFlowDefinition, controllers: Controllers) => {
    const options = {
      ...this.options,
      variableController: this,
      propsController: this,
      controllers,
    }
    return new GraphicalActivity(reactionMeta, options)
  }
}
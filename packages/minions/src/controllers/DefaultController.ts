import { IControllerMeta, IReaction, IReactionDefineMeta } from "@rxdrag/schema";
import { Controllers, EventFuncs, IController, InputFunc, PropsListener, UnListener, VariableListener } from "../interfaces";
import { IFactoryOptions, IActivityFactoryOptions } from "./IFactoryOptions"
import { GraphicalReaction } from "./GraphicalReaction"

export const INIT_EVENT_NAME = "init"
export const DESTORY_EVENT_NAME = "destory"

export class DefaultController<IOptions extends IFactoryOptions> implements IController {
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

  private reactions: IReaction[] = []

  constructor(public meta: IControllerMeta, protected parentControllers: Controllers, protected options?: IOptions) {
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

  private makeReaction = (reactionMeta: IReactionDefineMeta, controllers: Controllers) => {
    const options: IActivityFactoryOptions = {
      ...this.options,
      variableController: this,
      propsController: this,
      controllers,
    }
    if (reactionMeta.logicMetas) {
      return new GraphicalReaction(reactionMeta, options)
    }
  }
}
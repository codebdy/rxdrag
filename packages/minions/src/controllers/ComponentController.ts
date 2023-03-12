import { INIT_EVENT_NAME, DESTORY_EVENT_NAME } from "react-shells/ant5/shared/createReactionSchema";
import { ComponentControllers, EventFuncs, IComponentController, InputFunc, IReaction, IReactionFactoryOptions, PropsListener, UnListener, VariableListener } from "runner/minions/interfaces/controller";
import { IControllerMeta, IReactionDefineMeta } from "../interfaces/metas";
import { GraphicalReaction } from "../../../react-shells/ant5/materials/controller/reaction/GraphicalReaction";
import { CodeReaction } from "react-shells/ant5/materials/controller/reaction/CodeReaction";

export class ComponentController implements IComponentController {
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

  constructor(public meta: IControllerMeta, protected parentControllers: ComponentControllers, protected options?:IReactionFactoryOptions) {
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

  private makeReaction = (reactionMeta: IReactionDefineMeta, controllers: ComponentControllers) => {
    const options = {
      ...this.options,
      variableController: this,
      propsController: this,
      controllers,
    }
    if (reactionMeta.logicMetas) {
      return new GraphicalReaction(reactionMeta, options)
    } else if (reactionMeta.jsCode) {
      return new CodeReaction(reactionMeta)
    }
  }
}
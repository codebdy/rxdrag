/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controllers, ControllerFactory } from "../interfaces/controller";
import { IControllerMeta, ILogicFlowControllerMeta } from "../interfaces";
import { IActivity, LogicFlow } from "@rxdrag/minions-runtime";
import { ILogicFlowDefinition } from "@rxdrag/minions-schema";
import { AbstractController } from "./AbstractController";

export const INIT_EVENT_NAME = "init"
export const DESTORY_EVENT_NAME = "destory"

export class LogicFlowController extends AbstractController {
  private activites: IActivity[] = []

  constructor(public meta: ILogicFlowControllerMeta) {
    super(meta)
  }

  //为了预构造全局，分两阶段初始化, controllers包括全局的
  init(relatedControllers: Controllers | undefined, context: unknown) {
    if (this.isInitialized) {
      return;
    }

    for (const eventMeta of this.meta.events || []) {
      const reaction = this.makeReaction(eventMeta, { ...relatedControllers, [this.id]: this }, context)
      reaction && this.activites.push(reaction)
      if (!reaction) {
        continue
      }
      const inputOne = reaction.jointers.inputs[0]
      if (!inputOne) {
        continue
      }
      //事件参数转成数组传给编排节点
      const enventHandler = (...args: unknown[]) => inputOne.push(args);
      if (eventMeta.name === INIT_EVENT_NAME) {
        this.initEvent = enventHandler
      } else if (eventMeta.name === DESTORY_EVENT_NAME) {
        this.destoryEvent = enventHandler
      } else if (eventMeta.name) {
        this.events[eventMeta.name] = enventHandler
      }
    }
    for (const variable of this.meta.variables || []) {
      this.variables[variable.name] = variable.defaultValue
    }
    //this.isInitialized = true;
  }

  destory = () => {
    for (const reaction of this.activites) {
      reaction.destory()
    }
    this.activites = []
    this.events = {}
  }
  private makeReaction = (reactionMeta: ILogicFlowDefinition, controllers: Controllers, flowContext: unknown) => {
    const context = {
      ...flowContext as any,
      variableController: this,
      propsController: this,
      controllers,
    }
    return new LogicFlow(reactionMeta, context)
  }
}

export const LogicFlowControllerFactory: ControllerFactory = (meta: IControllerMeta) => {
  return new LogicFlowController(meta)
}
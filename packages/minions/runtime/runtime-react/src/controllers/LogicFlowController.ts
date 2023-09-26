/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controllers, ControllerFactory } from "../interfaces/controller";
import { IOldControllerMeta, ILogicFlowControllerMeta } from "../interfaces";
import { IActivity, LogicFlow } from "@rxdrag/minions-runtime";
import { ILogicFlowDefine } from "@rxdrag/minions-schema";
import { AbstractController } from "./AbstractController";

export const INIT_EVENT_NAME = "init"
export const DESTROY_EVENT_NAME = "destroy"

export class LogicFlowController extends AbstractController {
  private activities: IActivity[] = []

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
      reaction && this.activities.push(reaction)
      if (!reaction) {
        continue
      }
      const inputOne = reaction.jointers.inputs[0]
      if (!inputOne) {
        continue
      }
      //事件参数转成数组传给编排节点
      const eventHandler  = (arg: unknown, context?: Record<string, unknown>, runback?: (error?: unknown, value?: unknown) => void) => {
        const runContext = context || {};
        if (runback) {
          // 内置上下文，在输出元件上做处理
          runContext['__runback'] = runback
        }
        inputOne.push(arg, runContext)
      };
      if (eventMeta.name === INIT_EVENT_NAME) {
        this.initEvent = eventHandler
      } else if (eventMeta.name === DESTROY_EVENT_NAME) {
        this.destroyEvent = eventHandler
      } else if (eventMeta.name) {
        if (eventMeta.isRunBack) {
          this.runBackEvents[eventMeta.name] = eventHandler
        } else {
          this.events[eventMeta.name] = eventHandler
        }
      }
    }
    for (const variable of this.meta.variables || []) {
      this.variables[variable.name] = variable.defaultValue
    }
    //this.isInitialized = true;
  }

  destroy = () => {
    for (const reaction of this.activities) {
      reaction.destroy()
    }
    this.activities = []
    this.events = {}
  }
  private makeReaction = (reactionMeta: ILogicFlowDefine, controllers: Controllers, flowContext: unknown) => {
    const context = {
      ...flowContext as any,
      variableController: this,
      propsController: this,
      controllers,
    }
    return new LogicFlow(reactionMeta, context)
  }
}

export const LogicFlowControllerFactory: ControllerFactory = (meta: IOldControllerMeta) => {
  return new LogicFlowController(meta)
}
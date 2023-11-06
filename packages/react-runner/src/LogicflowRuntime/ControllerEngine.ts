

import { ComponentController, ControllerReaction, ControllerScopeType, IController, IVariableController, LogicDefines, VariableController } from "@rxdrag/minions-runtime-react"
import { IComponentRenderSchema } from "../ComponentView"
import { IVariable } from "@rxdrag/minions-schema"
import { ILogicScope } from "@rxdrag/minions-runtime"

export type ControllerOptions = {
  variableMetas?: IVariable[],
  parent?: ControllerEngine,
  reactions?: Record<string, ControllerReaction>,
  logicDefines?: LogicDefines,
  logicScope?: ILogicScope,
  expVariables?: Record<string, unknown>,
}

export class ControllerEngine {
  selfControllers: Record<string, IController>
  variableController?: IVariableController
  reactions?: Record<string, ControllerReaction>
  logicDefines?: LogicDefines
  logicScope?: ILogicScope
  expVariables?: Record<string, unknown>
  inited?: boolean
  controllers: Record<string, IController> = {}

  constructor(schema: IComponentRenderSchema,
  ) {
    this.selfControllers = this.getSchemaControllers(schema, {})
  }

  init(options?: ControllerOptions) {
    this.controllers = { ...this.selfControllers, ...options?.parent?.controllers }
    this.variableController = options?.parent?.variableController || new VariableController()
    this.reactions = options?.reactions
    this.logicDefines = options?.logicDefines
    this.variableController.setMetas(options?.variableMetas)
    this.logicScope = options?.logicScope
    this.expVariables = options?.expVariables
    this.inited = true
  }

  getSchemaControllers = (schema: IComponentRenderSchema, controllers: Record<string, IController>) => {
    const controllerMeta = schema?.["x-controller"];
    //const fieldMeta = schema?.["x-data"]
    if (controllerMeta?.enable) {
      const controller = new ComponentController(controllerMeta);
      if (controller) {
        controllers[controllerMeta.id] = controller
      }
    }

    if (controllerMeta?.scopeType !== ControllerScopeType.array && controllerMeta?.scopeType !== ControllerScopeType.tree) {
      for (const child of schema?.children || []) {
        this.getSchemaControllers(child as IComponentRenderSchema, controllers);
      }
    }

    for (const slotName of Object.keys(schema?.slots || {})) {
      const child = schema?.slots?.[slotName]
      this.getSchemaControllers(child as IComponentRenderSchema, controllers);
    }
    return controllers
  }

  public getController = (id: string): IController | undefined => {
    return this.controllers[id];
  }

  public getControllerByName = (name: string): IController | undefined => {
    for (const key of Object.keys(this.controllers)) {
      if (this.controllers[key]?.name === name) {
        return this.controllers[key]
      }
    }
  }

  public remove(id: string) {
    //const control = this.controllers[controllerKey]
    delete this.controllers[id]
  }

  public destroy = () => {
    //销毁控制器引擎
    console.log("销毁控制器引擎")
    for (const ctrlKey of Object.keys(this.controllers)) {
      this.controllers[ctrlKey]?.destroyEvent()
      this.controllers[ctrlKey]?.destroy()
    }
    this.controllers = {}
  }

}


import { ComponentController, ControllerReaction, IController, IVariableController, VariableController } from "@rxdrag/minions-runtime-react"
import { IComponentRenderSchema } from "../ComponentView"
import { ILogicFlowDefine, IVariable } from "@rxdrag/minions-schema"
import { ILoopScope } from "@rxdrag/minions-runtime"

export type ControllerOptions = {
  variableMetas?: IVariable[],
  parent?: ControllerEngine,
  reactions?: Record<string, ControllerReaction>,
  fxMetas?: ILogicFlowDefine[],
  loopScope?: ILoopScope
}

export class ControllerEngine {
  controllers: Record<string, IController>
  variableController: IVariableController
  reactions?: Record<string, ControllerReaction>
  fxMetas?: ILogicFlowDefine[]
  loopScope?: ILoopScope

  constructor(schema: IComponentRenderSchema,
    options?: ControllerOptions,
  ) {
    console.log("创建控制器引擎")
    this.variableController = options?.parent?.variableController || new VariableController()
    this.reactions = options?.reactions
    this.fxMetas = options?.fxMetas
    this.variableController.setMetas(options?.variableMetas)
    this.controllers = this.getSchemaControllers(schema, { ...options?.parent?.controllers },)
    this.loopScope = options?.loopScope
  }

  getSchemaControllers = (schema: IComponentRenderSchema, controllers: Record<string, IController>) => {
    const controllerMeta = schema?.["x-controller"];
    const fieldMeta = schema?.["x-field"]
    if (controllerMeta?.enable) {
      const controller = new ComponentController(controllerMeta);
      if (controller) {
        controllers[controllerMeta.id] = controller
      }
    }

    if (fieldMeta?.type !== "array") {
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
      this.controllers[ctrlKey]?.destroy()
    }
    this.controllers = {}
  }

}
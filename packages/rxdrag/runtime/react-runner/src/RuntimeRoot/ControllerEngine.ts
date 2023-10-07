

import { ControllerFactory, DefaultControllerName, IController, IControllerMeta, IVariableController, VariableController } from "@rxdrag/minions-runtime-react"
import { IComponentRenderSchema } from "../ComponentView"
import { IVariable } from "@rxdrag/minions-schema"

export type ControllerOptions = {
  variableMetas?: IVariable[],
  parent?: ControllerEngine,
}

export class ControllerEngine {
  controllers: Record<string, IController>
  variableController: IVariableController

  constructor(schema: IComponentRenderSchema,
    protected controllerFactories: Record<string, ControllerFactory>,
    options?: ControllerOptions,
  ) {
    console.log("创建控制器引擎")
    this.variableController = options?.parent?.variableController || new VariableController()
    this.variableController.setMetas(options?.variableMetas)
    this.controllers = this.getSchemaControllers(schema, { ...options?.parent?.controllers },)
  }

  getSchemaControllers = (schema: IComponentRenderSchema, controllers: Record<string, IController>) => {
    const controllerMeta = schema?.["x-controller"];
    const fieldMeta = schema?.["x-field"]
    if (controllerMeta?.enable) {
      const controller = this.makeController(controllerMeta);
      if (controller && schema?.id) {
        controllers[schema?.id] = controller
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

  public getController = (id: string) => {
    return this.controllers[id];
  }

  public getCongtrollerByName = (name: string) => {
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

  private makeController = (meta: IControllerMeta) => {
    const factory = this.controllerFactories[meta.controllerName || DefaultControllerName]

    if (!factory) {
      console.error("Can not find controller factory:" + meta.controllerName || DefaultControllerName)
      return
    }

    return factory(meta)
  }
}


import { ControllerFactory, Controllers, IController, IControllerMeta } from "@rxdrag/minions-runtime-react"
import { IComponentRenderSchema } from "../ComponentView"

//1、以schemaId为key的控制器管理引擎，一个页面一份，防止重复渲染导致的重复数据库访问

export type ControllerFactories = {
  [type: string]: ControllerFactory | undefined
}

type ControllerMetas = {
  [id: string]: IControllerMeta | undefined
}

export class RuntimeEngine {
  //所有控制器，注意id为schema id
  controllers: Controllers = {}

  //全局控制器 id为controller id
  globalControllers: Controllers = {}

  constructor(schema: IComponentRenderSchema | undefined,
    protected controllerFactories: ControllerFactories,
    protected context: unknown,
  ) {
    //第一步构建所有controller
    const controllers = this.getSchemaControllers(schema, {}, {})
    //初始化构建的controller
    for (const id of Object.keys(controllers)) {
      controllers[id]?.init(controllers);
    }
    this.controllers = controllers

    //转换id以后，存入全局控制器
    for (const schemaId of Object.keys(controllers)) {
      const ctrl = controllers[schemaId]
      if (ctrl) {
        this.globalControllers[ctrl.id] = ctrl;
      }
    }
  }

  getSchemaControllers = (schema: IComponentRenderSchema | undefined, controllers: Controllers, passedByMetas: ControllerMetas) => {
    const controllerMeta = schema?.["x-controller"];
    if (controllerMeta?.global) {
      const controller = this.makeController(controllerMeta);
      if (controller && schema?.id) {
        controllers[schema?.id] = controller
        //补全所有的父控制器
        for (const schemaId of Object.keys(passedByMetas)) {
          const meta = passedByMetas[schemaId]
          if (meta) {
            const ctrl = this.makeController(meta);
            if (ctrl) {
              controllers[schemaId] = ctrl
            }
          }
        }
      }

    } else if (controllerMeta) {
      passedByMetas[schema?.id] = controllerMeta
    }

    for (const child of schema?.children || []) {
      this.getSchemaControllers(child as IComponentRenderSchema, controllers, passedByMetas);
    }

    for (const slotName of Object.keys(schema?.slots || {})) {
      const child = schema?.slots?.[slotName]
      this.getSchemaControllers(child as IComponentRenderSchema, controllers, passedByMetas);
    }

    return controllers
  }

  public getOrCreateController(meta: IControllerMeta, schemaId: string) {
    if (!this.controllers[schemaId]) {
      this.controllers[schemaId] = this.makeController(meta);
    }

    return this.controllers[schemaId] as IController;
  }

  private makeController(meta: IControllerMeta) {
    if (!meta.controllerType) {
      console.error("Not set controller type")
      return
    }
    const factory = this.controllerFactories[meta.controllerType]

    if (!factory) {
      console.error("Can not find controller factory:" + meta.controllerType)
      return
    }

    return factory(meta, this.context)
  }

}
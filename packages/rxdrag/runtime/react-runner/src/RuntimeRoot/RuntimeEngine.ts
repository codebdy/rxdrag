

import { Controllers, IController } from "@rxdrag/minions-runtime-react"
import { IComponentRenderSchema } from "../ComponentView"

//1、以schemaId为key的控制器管理引擎，一个页面一份，防止重复渲染导致的重复数据库访问

// export type ControllerFactories = {
//   [type: string]: OldControllerFactory | undefined
// }

// type ControllerMetas = {
//   [id: string]: IOldControllerMeta | undefined
// }

export class RuntimeEngine {
  //所有控制器，注意id为fieldpath + schema id
  controllers: Controllers = {}

  //全局控制器 id为controller id
  globalControllers: Controllers = {}

  constructor(schema: IComponentRenderSchema,
    protected controllerFactories: ControllerFactories,
  ) {
    console.log("创建控制器引擎")
    //第一步构建所有全局controller
    const glControllers = this.getSchemaControllers(schema, {}, {})
    //转换id以后，存入全局控制器
    for (const schemaId of Object.keys(glControllers)) {
      const ctrl = glControllers[schemaId]
      if (ctrl) {
        this.globalControllers[ctrl.id] = ctrl;
      }
    }
    this.controllers = glControllers
    //初始化构建的controller
    // for (const id of Object.keys(this.globalControllers)) {
    //   this.globalControllers[id]?.init(this.globalControllers);
    // }
  }

  getSchemaControllers = (schema: IComponentRenderSchema, controllers: Controllers, passedByMetas: ControllerMetas) => {
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

  public getOrCreateController = (meta: IOldControllerMeta, controllerKey: string) => {
    if (!this.controllers[controllerKey]) {
      this.controllers[controllerKey] = this.makeController(meta);
    }
    return this.controllers[controllerKey] as IController;
  }

  public remove(controllerKey: string) {
    //const control = this.controllers[controllerKey]
    delete this.controllers[controllerKey]
  }

  public destroy = () => {
    //销毁控制器引擎
    console.log("销毁控制器引擎")
    for (const ctrlKey of Object.keys(this.controllers)) {
      this.controllers[ctrlKey]?.destroy()
    }
    this.controllers = {}
    this.globalControllers = {}
  }

  private makeController = (meta: IOldControllerMeta) => {
    if (!meta.controllerType) {
      console.error("Not set controller type")
      return
    }
    const factory = this.controllerFactories[meta.controllerType]

    if (!factory) {
      console.error("Can not find controller factory:" + meta.controllerType)
      return
    }

    return factory(meta)
  }

}
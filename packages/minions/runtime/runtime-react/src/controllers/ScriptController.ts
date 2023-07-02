import { ControllerFactory, Controllers, IControllerMeta, IScriptControllerMeta } from "../interfaces";
import { AbstractController } from "./AbstractController";

export class ControllerManger {
  constructor(protected controllers?: Controllers) {
  }

  getCotroller(name?: string) {
    for (const ctrlId of Object.keys(this.controllers || {})) {
      const ctrl = this.controllers?.[ctrlId]
      if (ctrl?.name === name) {
        return ctrl
      }
    }
  }
}

export class ScriptController extends AbstractController {
  context?: unknown
  controllers?: Controllers

  constructor(public meta: IScriptControllerMeta) {
    super(meta)
  }
  init(relatedControllers: Controllers | undefined, context?: unknown) {
    this.context = context
    this.controllers = relatedControllers
    //this.events[INIT_EVENT_NAME] = this.initEvent
  }

  initEvent = () => {
    if (this.meta.script?.trim()) {
      new Function("$self", "$controllers", ...Object.keys(this.context || {}).map(key => "$" + key), this.meta.script)(
        this,
        new ControllerManger(this.controllers),
        ...Object.values(this.context || {})
      )
    } else {
      console.warn("Script controller has not set code")
    }
  }
  destory(): void {
    //throw new Error("Method not implemented.");
  }

  on = (name: string, callback: (...args: unknown[]) => void) => {
    this.events[name] = callback
  }
}

export const ScriptControllerFactory: ControllerFactory = (meta: IControllerMeta) => {
  return new ScriptController(meta)
}
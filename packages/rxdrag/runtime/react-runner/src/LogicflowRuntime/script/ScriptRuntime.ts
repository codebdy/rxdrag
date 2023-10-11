import { IScriptDefine } from "@rxdrag/minions-schema";
import { ControllerEngine } from "../ControllerEngine";
import { ScriptVariables } from "./ScriptVariables";
import { ScriptController } from "./ScriptController";

export class ScriptRuntime {
  variables: ScriptVariables
  controllers: ScriptController[] = []

  constructor(
    private controllerEngine: ControllerEngine | null,
    private params?: Record<string, unknown>,
  ) {
    this.variables = new ScriptVariables(controllerEngine?.variableController)
    this.run()
  }

  run() {
    const fxStrs = this.controllerEngine?.logicDefines?.fxScripts?.reduce((prev: string, cur: IScriptDefine) => {
      return prev + "\n" + cur.code
    }, "")

    const scripts = this.controllerEngine?.logicDefines?.scripts?.reduce((prev: string, cur: IScriptDefine) => {
      return prev + "\n" + cur.code
    }, "")

    const fn = new Function('get', 'variables', ...Object.keys(this.params || {}), fxStrs + "\n" + scripts);
    fn(this.getComponent, this.variables)
  }

  getComponent = (name?: string) => {
    if (!name) {
      return
    }
    console.log("====>getComponent", name)
    let ctrl = this.controllers.find(ctrl => ctrl.name === name)
    if (ctrl) {
      return ctrl;
    }
    const comCtrl = this.controllerEngine?.getControllerByName(name)
    console.log("====>getComponent3", name, this.controllerEngine, comCtrl)

    if (comCtrl) {
      ctrl = new ScriptController(name, comCtrl)
      this.controllers.push(ctrl)
    }

    return ctrl
  }

  dispose() {
    this.variables.dispose()
    for (const ctrl of this.controllers) {
      ctrl.dispose()
    }
  }
}
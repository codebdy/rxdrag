import { IScriptDefine } from "@rxdrag/minions-schema";
import { ControllerEngine } from "../ControllerEngine";
import { IVariableController } from "@rxdrag/minions-runtime-react";
import { ScriptVariables } from "./ScriptVariables";
import { ScriptController } from "./ScriptController";

export class ScriptRuntime {
  variables: ScriptVariables
  controllers: ScriptController[] = []

  constructor(
    private scripts: IScriptDefine[],
    private fxScripts: IScriptDefine[] | undefined,
    private controllerEngine: ControllerEngine | null,
    variablesController: IVariableController,
    private params?: Record<string, unknown>,
  ) {
    this.variables = new ScriptVariables(variablesController)
    this.run()
  }

  run() {
    const fxStrs = this.fxScripts?.reduce((prev: string, cur: IScriptDefine) => {
      return prev + "\n" + cur.code
    }, "")

    const scripts = this.scripts.reduce((prev: string, cur: IScriptDefine) => {
      return prev + "\n" + cur.code
    }, "")

    const fn = new Function('get', 'variables', ...Object.keys(this.params || {}), fxStrs + "\n" + scripts);
    fn(this.getComponent)
  }

  getComponent = (name?: string) => {
    if (!name) {
      return
    }

    let ctrl = this.controllers.find(ctrl => ctrl.name === name)
    if (ctrl) {
      return ctrl;
    }

    const comCtrl = this.controllerEngine?.getControllerByName(name)

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
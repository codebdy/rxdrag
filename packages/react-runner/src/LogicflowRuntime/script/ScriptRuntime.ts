import { IScriptDefine } from "@rxdrag/minions-schema";
import { ControllerEngine } from "../ControllerEngine";
import { ScriptVariables } from "./ScriptVariables";
import { ScriptController, getProxyHandler } from "./ScriptController";

export class ScriptRuntime {
  variables: ScriptVariables
  controllers: ScriptController[] = []

  constructor(
    private controllerEngine: ControllerEngine | null,
    private params?: Record<string, unknown>,
    private ownerId?: string,
  ) {
    this.variables = new ScriptVariables(controllerEngine?.variableController)
    try {
      this.run()
    } catch (e) {
      console.error("Run script error", e)
    }
  }

  run() {
    const fxStrs = this.controllerEngine?.logicDefines?.fxScripts?.reduce((prev: string, cur: IScriptDefine) => {
      return prev + "\n" + cur.code
    }, "")

    const scripts = this.controllerEngine?.logicDefines?.scripts?.filter(script => script.ownerId === this.ownerId)

    for (const script of scripts || []) {
      if (script.code) {
        const fn = new Function("logicScope", 'get', 'variables', ...Object.keys(this.params || {}), fxStrs + "\n" + script.code);
        fn(
          this.controllerEngine?.logicScope,
          this.getComponent,
          this.variables,
          ...Object.values(this.params || {})
        )
      }
    }

  }

  getComponent = (name?: string) => {
    if (!name) {
      return
    }
    const ctrl = this.controllers.find(ctrl => ctrl.name === name)
    if (ctrl) {
      return ctrl;
    }
    const comCtrl = this.controllerEngine?.getControllerByName(name)

    if (comCtrl) {
      const ctrl = new Proxy(
        new ScriptController(name, comCtrl, this.controllerEngine),
        {
          get: getProxyHandler
        },
      )
      this.controllers.push(ctrl)
      return ctrl
    }
  }

  dispose() {
    this.variables.dispose()
    for (const ctrl of this.controllers) {
      ctrl.dispose()
    }
  }
}
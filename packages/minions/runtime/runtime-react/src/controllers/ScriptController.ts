import { ControllerFactory, Controllers, EventFunc, EventFuncs, IController, IControllerMeta, IScriptControllerMeta, PropListener, PropsListener, UnListener, VariableListener } from "../interfaces";

export class ScriptController implements IController {
  id: string;
  name?: string | undefined;
  events: EventFuncs = {};
  initEvent?: EventFunc | undefined;
  destoryEvent?: EventFunc | undefined;
  constructor(public meta: IScriptControllerMeta,  protected context?: unknown) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.id = meta.id!
  }
  init(relatedControllers: Controllers | undefined,) {
    throw new Error("Method not implemented.");
  }
  subscribeToPropsChange(listener: PropsListener): UnListener {
    throw new Error("Method not implemented.");
  }
  destory(): void {
    throw new Error("Method not implemented.");
  }
  setVariable(name: string, value: unknown): void {
    throw new Error("Method not implemented.");
  }
  getVariable(name: string): unknown {
    throw new Error("Method not implemented.");
  }
  subscribeToVariableChange(name: string, listener: VariableListener): UnListener {
    throw new Error("Method not implemented.");
  }
  setProp(name: string, value: unknown): void {
    throw new Error("Method not implemented.");
  }
  getProp(name: string): unknown {
    throw new Error("Method not implemented.");
  }
  subscribeToPropChange(name: string, listener: PropListener): UnListener {
    throw new Error("Method not implemented.");
  }

}

export const ScriptControllerFactory: ControllerFactory = (meta: IControllerMeta, controllerContext: unknown) => {
  return new ScriptController(meta, controllerContext)
}
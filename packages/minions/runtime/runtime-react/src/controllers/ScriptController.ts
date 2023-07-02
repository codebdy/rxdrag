import { ControllerFactory, Controllers, IControllerMeta, IScriptControllerMeta } from "../interfaces";
import { AbstractController } from "./AbstractController";

export class ScriptController extends AbstractController{
  constructor(public meta: IScriptControllerMeta) {
    super(meta)
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.id = meta.id!
  }
  init(relatedControllers: Controllers | undefined,) {
    throw new Error("Method not implemented.");
  }

  destory(): void {
    throw new Error("Method not implemented.");
  }


}

export const ScriptControllerFactory: ControllerFactory = (meta: IControllerMeta) => {
  return new ScriptController(meta)
}
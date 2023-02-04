import { EventFuncs, IComponentController, InputFunc, PropsListener, Reactions, UnListener, VariableListener } from "runner/reaction/interfaces/interfaces";
import { IControllerMeta } from "../interfaces/metas";


export class ComponentController implements IComponentController {
  id: string;
  name?: string;
  events?: EventFuncs | undefined;
  reactions?: Reactions;
  constructor(meta: IControllerMeta, protected parentReactions: Reactions) {
    this.id = meta.id!
  }

  initEvent?: InputFunc | undefined;
  destoryEvent?: InputFunc | undefined;
  setVariable(name: string, value: any): void {
    throw new Error("Method not implemented.");
  }
  subcribeToVariableChange(name: string, listener: VariableListener): UnListener {
    throw new Error("Method not implemented.");
  }
  subscribeToPropsChange(listener: PropsListener): UnListener {
    throw new Error("Method not implemented.");
  }

}
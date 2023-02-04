import { Reactions } from "runner/ComponentRender/contexts";
import { IComponentController, IReaction, PropsListener, UnListener, VariableListener } from "runner/reaction/interfaces/interfaces";
import { IControllerMeta } from "../interfaces/metas";


export class ComponentController implements IComponentController {
  id: string;
  name?: string | undefined;
  events?: IReaction[] | undefined;
  reactions?: IReaction[] | undefined;
  constructor(meta: IControllerMeta, protected parentReactions: Reactions) {
    this.id = meta.id!
  }
  subscribeToPropsChange(listener: PropsListener): UnListener {
    throw new Error("Method not implemented.");
  }
  setVariable(name: string, value: any): void {
    throw new Error("Method not implemented.");
  }
  subcribeToVariableChange(name: string, listener: VariableListener): UnListener {
    throw new Error("Method not implemented.");
  }
}
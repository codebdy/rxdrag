import { IReactionMaterial } from "@rxdrag/schema";
import { Controllers, IPropController, IVariableController } from "../interfaces";

export interface IFactoryOptions {
  controllers?: Controllers,
  materials?: IReactionMaterial[],
}

export interface IReactionFactoryOptions extends IFactoryOptions {
  variableController?: IVariableController,
  propsController?: IPropController,
}
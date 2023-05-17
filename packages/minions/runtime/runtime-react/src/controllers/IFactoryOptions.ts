import { IActivityMaterial } from "@rxdrag/minions-schema";
import { Controllers, IVariableController, IPropController } from "../interfaces/controller";

export interface IFactoryOptions {
  controllers?: Controllers,
  materials?: IActivityMaterial[],
}

export interface IActivityFactoryOptions extends IFactoryOptions {
  variableController?: IVariableController,
  propsController?: IPropController,
}
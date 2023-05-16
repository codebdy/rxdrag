import { IActivityMaterial } from "@rxdrag/schema";
import { Controllers, IPropController, IVariableController } from "../interfaces";

export interface IFactoryOptions {
  controllers?: Controllers,
  materials?: IActivityMaterial[],
}

export interface IActivityFactoryOptions extends IFactoryOptions {
  variableController?: IVariableController,
  propsController?: IPropController,
}
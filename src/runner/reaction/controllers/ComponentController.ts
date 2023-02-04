import { IComponentController, IReaction, IVariableListener } from "runner/reaction/interfaces/interfaces";


export class ComponentController implements IComponentController {
  name?: string | undefined;
  events?: IReaction[] | undefined;
  reactions?: IReaction[] | undefined;
  constructor(public id:string){

  }
  setVariable(name: string, value: any): void {
    throw new Error("Method not implemented.");
  }
  listenVariable(name: string, listener: IVariableListener): void {
    throw new Error("Method not implemented.");
  }
}
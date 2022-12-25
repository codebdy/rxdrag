import { IFieldParams } from "fieldy/contexts";
import { IFieldyEngine } from "fieldy/interfaces";

export const PREFIX_SIBLINGS = "$siblings";

export class Siblings{
  constructor(private fieldParams: IFieldParams, private fieldy: IFieldyEngine, private formName: string) { }
}
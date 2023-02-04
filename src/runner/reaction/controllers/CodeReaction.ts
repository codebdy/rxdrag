import { InputHandlers, IReaction, OutputJointers } from "../interfaces/interfaces";
import { IReactionDefineMeta } from "../interfaces/metas";

export class CodeReaction implements IReaction{
  id: string;
  inputs: InputHandlers = {};
  outputs: OutputJointers = {};
  constructor(meta: IReactionDefineMeta) {
    this.id = meta.id
  }
}
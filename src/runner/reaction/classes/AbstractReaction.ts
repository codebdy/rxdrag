import { IConfigMeta, IJointer, IReaction, IReactionFactoryOptions, IReactionMeta } from "../interfaces";
import { Jointer } from "./jointer";

export abstract class AbstractReaction<ConfigMeta extends IConfigMeta> implements IReaction {
  id: string;
  inputs: IJointer[] = [];
  outputs: IJointer[] = [];
  constructor(public meta: IReactionMeta<ConfigMeta>, protected options?: IReactionFactoryOptions) {
    this.id = meta.id
    for (const out of meta.outPorts || []) {
      this.outputs.push(new Jointer(out.id, out.name))
    }

    for (const input of meta.inPorts || []) {
      this.inputs.push(new Jointer(input.id, input.name))
    }
  }
  destory = () => {
  }

  getOutputByName(name: string) {
    return this.outputs.find(out => out.name === name && name)
  }

  getOutputById(id: string) {
    return this.outputs.find(out => out.id === id)
  }

  getInputByName(name: string) {
    return this.inputs.find(input => input.name === name && name)
  }

  getInputById(id: string) {
    return this.inputs.find(input => input.id === id)
  }
}
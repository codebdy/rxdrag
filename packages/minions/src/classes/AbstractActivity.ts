import { IConfigMeta, IJointer, IActivity, IActivityDefine } from "@rxdrag/schema";
import { Jointer } from "./jointer";

export abstract class AbstractActivity<ConfigMeta extends IConfigMeta, IActivityFactoryOptions = any> implements IActivity {
  id: string;
  inputs: IJointer[] = [];
  outputs: IJointer[] = [];
  constructor(public meta: IActivityDefine<ConfigMeta>, protected options?: IActivityFactoryOptions) {
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
import { IActivity, IActivityJointers, IJointer } from "../interfaces/activity";
import { Jointer } from "./Jointer";

export abstract class AbstractActivity<ConfigMeta = unknown> implements IActivity {
  id: string;
  jointers: IActivityJointers;
  constructor(public meta: IActivityDefine<ConfigMeta>) {
    this.id = meta.id
    this.jointers = {
      inputs:[],
      outputs:[]
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
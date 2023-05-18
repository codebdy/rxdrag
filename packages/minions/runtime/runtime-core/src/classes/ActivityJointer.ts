import { IActivityJointers, IJointer } from "../interfaces";

export class ActivityJointers implements IActivityJointers{
  inputs: IJointer[] = [];
  outputs: IJointer[] = [];
  
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
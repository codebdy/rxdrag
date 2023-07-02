import { IActivityJointers, IJointer } from "../interfaces";

export class ActivityJointers implements IActivityJointers{
  inputs: IJointer[] = [];
  outputs: IJointer[] = [];
  
  getOutput(name: string) {
    return this.outputs.find(out => out.name === name && name)
  }

  getInput(name: string) {
    return this.inputs.find(input => input.name === name && name)
  }

}
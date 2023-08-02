import { IActivityJointers } from "../interfaces";
import { Jointer } from "./Jointer";

export class ActivityJointers implements IActivityJointers{
  inputs: Jointer[] = [];
  outputs: Jointer[] = [];
  
  getOutput(name: string) {
    return this.outputs.find(out => out.name === name && name)
  }

  getInput(name: string) {
    return this.inputs.find(input => input.name === name && name)
  }

}
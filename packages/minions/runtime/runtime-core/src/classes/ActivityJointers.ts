import { IActivityJointers } from "../interfaces";
import { Jointer } from "./Jointer";

export class ActivityJointers implements IActivityJointers {
  private inputs: Jointer[] = [];
  private outputs: Jointer[] = [];

  addInput(input: Jointer): void {
    this.inputs.push(input)
  }
  addOutput(output: Jointer): void {
    this.outputs.push(output)
  }

  removeInput(input: Jointer): void {
    this.inputs.splice(this.inputs.indexOf(input), 1)
  }
  removeOutput(output: Jointer): void {
    this.outputs.splice(this.outputs.indexOf(output), 1)
  }
  getInputs(): Jointer[] {
    return this.inputs
  }
  getOutputs(): Jointer[] {
    return this.outputs
  }

  getOutput(name: string) {
    return this.outputs.find(out => out.name === name && name)
  }

  getInput(name: string) {
    return this.inputs.find(input => input.name === name && name)
  }

}
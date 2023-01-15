import { IComponentController, InputHandlers, OutputJointers } from "../interfaces";

/**
 * 控制点:
 *  onInit
 *  onFieldChange
 *  onMultiFieldChange
 */
export class FormControllerimplements implements IComponentController {
  effects: InputHandlers = {};
  events: InputHandlers = {};
  state: any;
  inputs: InputHandlers = {};
  outputs: InputHandlers = {};
  private jointers: OutputJointers = {};

  getJointer(name: string) {
    return this.jointers[name]
  }
}
import { InputHandlers, OutputJointers, IComponentController } from "runner/reaction/interfaces";
import { Props } from "../classes/props";
import { IControllerMeta } from "../metas";

export class ComponentController implements IComponentController {
  state: any;
  inputs: InputHandlers = {};
  outputs: InputHandlers = {};
  effects: InputHandlers = {};
  events: InputHandlers = {};
  private jointers: OutputJointers = {};

  constructor(private meta: IControllerMeta, private $props: Props, private $actions: InputHandlers) {

  }

  getJointer(name: string) {
    return this.jointers[name]
  }
}
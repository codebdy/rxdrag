import { InputHandlers, OutputJointers, IComponentController } from "runner/reaction/interfaces";
import { Props } from "../classes/props";
import { IReactionsMeta } from "../metas";

export class ComponentController implements IComponentController {
  state: any;
  inputs: InputHandlers = {};
  outputs: InputHandlers = {};
  effects: InputHandlers = {};
  events: InputHandlers = {};
  private jointers: OutputJointers = {};

  constructor(private meta: IReactionsMeta, private $props: Props, private $actions: InputHandlers) {

  }

  getJointer(name: string) {
    return this.jointers[name]
  }
}
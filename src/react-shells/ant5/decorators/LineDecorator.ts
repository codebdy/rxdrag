import { IDecorator } from "core/interfaces/decorator";

export const LINE_DECORTOR_NAME = "lineDecorator"
export class LineDecorator implements IDecorator {
  name: string = LINE_DECORTOR_NAME;

  decorate(el: HTMLElement): void {
    el.classList.add("rx-node-outlined")
  }
  unDecorate(el: HTMLElement): void {
    el.classList.remove("rx-node-outlined")
  }

}
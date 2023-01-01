import { IDecorator } from "core/interfaces/decorator";

export const MARGIN_DECORATOR_NAME = "marginDecorator"
export class MarginDecorator implements IDecorator {
  name: string = MARGIN_DECORATOR_NAME;

  decorate(el: HTMLElement): void {
    el.classList.add("rx-node-margin")
  }
  unDecorate(el: HTMLElement): void {
    el.classList.remove("rx-node-margin")
  }
}
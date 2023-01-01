import { IDecorator } from "core/interfaces/decorator";

export const MARGIN_DECORATOR_NAME = "marginDecorator"
export class MarginDecorator implements IDecorator {
  name: string = MARGIN_DECORATOR_NAME;

  decorate(el: HTMLElement): void {
    throw new Error("Method not implemented.");
  }
  unDecorate(el: HTMLElement): void {
    throw new Error("Method not implemented.");
  }

}
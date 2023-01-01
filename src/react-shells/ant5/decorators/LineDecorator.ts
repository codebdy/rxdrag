import { IDecorator } from "core/interfaces/decorator";

export const LINE_DECORTOR_NAME = "lineDecorator"
export class LineDecorator implements IDecorator {
  name: string = LINE_DECORTOR_NAME;

  decorate(el: HTMLElement): void {
    throw new Error("Method not implemented.");
  }
  unDecorate(el: HTMLElement): void {
    throw new Error("Method not implemented.");
  }

}
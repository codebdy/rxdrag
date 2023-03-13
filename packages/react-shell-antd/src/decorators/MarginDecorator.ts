import { ITreeNode } from "core";
import { IDecorator } from "core/interfaces/decorator";

export const MARGIN_DECORATOR_NAME = "marginDecorator"
export class MarginDecorator implements IDecorator {
  name: string = MARGIN_DECORATOR_NAME;

  decorate(el: HTMLElement, node: ITreeNode): void {
    if (node.children && !node.meta?.locked) {
      el.classList.add("rx-node-margin")
    }
  }
  unDecorate(el: HTMLElement): void {
    el.classList.remove("rx-node-margin")
  }
}
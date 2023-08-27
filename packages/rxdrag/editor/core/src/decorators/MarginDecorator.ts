import { IDecorator, ITreeNode } from "../interfaces";

export const MARGIN_DECORATOR_NAME = "marginDecorator"
export class MarginDecorator implements IDecorator {
  name: string = MARGIN_DECORATOR_NAME;

  decorate(els: HTMLElement[], node: ITreeNode): void {
    if (node.children && !node.meta?.locked) {
      for (const el of els) {
        el.classList.add("rx-node-margin")
      }
    }
  }
  unDecorate(els: HTMLElement[]): void {
    for (const el of els) {
      el.classList.remove("rx-node-margin")
    }
  }
}
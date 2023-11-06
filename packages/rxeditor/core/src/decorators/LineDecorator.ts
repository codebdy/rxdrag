import { IDecorator, ITreeNode } from "../interfaces";

export const LINE_DECORTOR_NAME = "lineDecorator"
export class LineDecorator implements IDecorator {
  name: string = LINE_DECORTOR_NAME;

  decorate(els: HTMLElement[], node: ITreeNode): void {
    for (const el of els) {
      el.classList.add("rx-node-outlined")
    }
  }
  unDecorate(els: HTMLElement[]): void {
    for (const el of els) {
      el.classList.remove("rx-node-outlined")
    }
  }

}
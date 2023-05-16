import { IDecorator, ITreeNode } from "@rxdrag/core";
export declare const MARGIN_DECORATOR_NAME = "marginDecorator";
export declare class MarginDecorator implements IDecorator {
    name: string;
    decorate(el: HTMLElement, node: ITreeNode): void;
    unDecorate(el: HTMLElement): void;
}

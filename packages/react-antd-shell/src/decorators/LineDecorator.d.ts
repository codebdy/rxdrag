import { IDecorator, ITreeNode } from "@rxdrag/core";
export declare const LINE_DECORTOR_NAME = "lineDecorator";
export declare class LineDecorator implements IDecorator {
    name: string;
    decorate(el: HTMLElement, node: ITreeNode): void;
    unDecorate(el: HTMLElement): void;
}

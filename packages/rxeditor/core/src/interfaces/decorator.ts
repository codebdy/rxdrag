import { ITreeNode } from "./document";

export interface IDecorator {
  name: string
  decorate(el: HTMLElement[], node: ITreeNode): void;
  unDecorate(el: HTMLElement[]): void;
}

export interface IDecoratorManager {
  addDecorator(decorator: IDecorator, documentId: string): void
  removeDecorator(name: string, documentId: string): void
  getDecorator(name: string, documentId: string): IDecorator | undefined
}
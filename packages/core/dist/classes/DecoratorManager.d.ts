import { IDesignerEngine } from "interfaces";
import { IDecorator, IDecoratorManager } from "interfaces/decorator";
export type Decorators = {
    [key: string]: IDecorator | undefined;
};
export type DocumentDecorators = {
    [key: string]: Decorators;
};
export declare class DecoratorManager implements IDecoratorManager {
    private engine;
    private decorators;
    constructor(engine: IDesignerEngine);
    addDecorator(decorator: IDecorator, documentId: string): void;
    removeDecorator(name: string, documentId: string): void;
    getDecorator(name: string, documentId: string): IDecorator | undefined;
    private handleMounted;
    private attachDecorator;
    private detachDecorator;
}

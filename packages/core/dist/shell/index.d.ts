import { Canvases, IRect, IShellPane } from 'interfaces';
import { IDesignerShell } from 'interfaces';
import { EventEngine } from 'interfaces/event';
export declare class DesignerShell extends EventEngine implements IDesignerShell {
    dragging: boolean;
    private container?;
    private canvases;
    setContainer(el: IShellPane): void;
    getContainer(): IShellPane | undefined;
    getCanvas(documentId: string): IShellPane | undefined;
    getAllCanvases(): Canvases;
    addCanvas(canvas: IShellPane): void;
    removeCanvas(documentId: string): void;
    getTopRect(nodeId: string): IRect | null;
    getElement(nodeId: string): HTMLElement | null;
    destory(): void;
}

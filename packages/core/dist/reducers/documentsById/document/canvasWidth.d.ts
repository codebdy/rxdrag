import { CanvasWidthPayload, IDocumentAction } from "interfaces";
export type State = number | null;
export declare function canvasWidth(state: State | undefined, action: IDocumentAction<CanvasWidthPayload>): State;

import { CanvasWidthLimits, CanvasWidthLimitsPayload, IDocumentAction } from "interfaces";
export type State = CanvasWidthLimits | null;
export declare function canvasWidthLimits(state: State | undefined, action: IDocumentAction<CanvasWidthLimitsPayload>): State;

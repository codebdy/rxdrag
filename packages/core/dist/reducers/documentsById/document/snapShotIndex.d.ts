import { GotoPayload, IDocumentAction } from "interfaces";
export type State = number;
export declare function snapShotIndex(state: State, action: IDocumentAction<GotoPayload>): State;

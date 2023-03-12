import { DocumentInitPayload, ID, IDocumentAction } from "interfaces";
export type State = ID | undefined;
export declare function rootId(state: State, action: IDocumentAction<DocumentInitPayload>): State;

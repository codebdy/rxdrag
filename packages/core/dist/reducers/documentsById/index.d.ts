import { DocumentActionPayload, IDocumentAction } from "interfaces";
import { DocumentState } from "./document";
export type DocumentByIdState = {
    [key: string]: DocumentState | undefined;
};
export declare function documentsById(state: DocumentByIdState, action: IDocumentAction<DocumentActionPayload>): DocumentByIdState;

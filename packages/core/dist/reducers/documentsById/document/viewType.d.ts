import { IDocumentAction, ViewType, ViewTypePayload } from "interfaces";
export type State = ViewType;
export declare function viewType(state: string | undefined, action: IDocumentAction<ViewTypePayload>): State;

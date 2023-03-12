import { ID } from "interfaces";
import { IAction } from "interfaces/action";
import { ITreeNode } from "../interfaces/document";
import { DocumentActionPayload, ChangeMetaPayloads } from "../interfaces/payloads";
export type NodesById = {
    [id: ID]: ITreeNode;
};
export type State = NodesById;
export declare function nodesById(state: NodesById | undefined, action: IAction<DocumentActionPayload | ChangeMetaPayloads>): State;

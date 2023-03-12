import { ID, IDocumentAction, RecoverSnapshotPayload, SelectNodesPayload } from "interfaces";
export type State = ID[] | null;
export declare function selectedIds(state: State | undefined, action: IDocumentAction<SelectNodesPayload | RecoverSnapshotPayload>): State;

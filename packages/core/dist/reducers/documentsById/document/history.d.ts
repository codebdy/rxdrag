import { BackupPayload, IDocumentAction, ISnapshot } from "interfaces";
export type State = ISnapshot[];
export declare function history(state: State | undefined, action: IDocumentAction<BackupPayload>): State;

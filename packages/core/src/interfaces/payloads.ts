import { NodesById } from "core/reducers/nodesById";
import { ID, DocumentSelectionMode } from "./types";
import { HistoryableActionType, ITreeNode, NodeChunk, NodeRelativePosition, ISnapshot, INodeMeta, CanvasWidthLimits, ViewType } from "./document";


export type DocumentActionPayload = {
  documentId: ID;
};
export type SelectNodesPayload = DocumentActionPayload & {
  targetIds: ID[] | null;
};

export type BackupPayload = DocumentActionPayload & {
  nodes: NodesById;
  selectedIds: ID[];
  actionType: HistoryableActionType;
};

export type GotoPayload = DocumentActionPayload & {
  index: number | null;
};

export type DocumentInitPayload = DocumentActionPayload & {
  nodesById: {
    [id: ID]: ITreeNode;
  };
  rootId?: ID;
};

export type CanvasWidthPayload = DocumentActionPayload & {
  width: number | null;
};

export type CanvasWidthLimitsPayload = DocumentActionPayload & {
  limits: CanvasWidthLimits | null;
};

export type ViewTypePayload = DocumentActionPayload & {
  viewType: ViewType;
};

export type SelectionModePayload = DocumentActionPayload & {
  mode: DocumentSelectionMode;
};


export type AddNodesPayload = DocumentActionPayload & {
  targetId: ID;
  nodes: NodeChunk;
  pos?: NodeRelativePosition;
  slot?: string;
};

export type MoveNodesPayload = DocumentActionPayload & {
  targetId: ID;
  sourceIds: ID[];
  pos: NodeRelativePosition;
};

export type DeleteNodesPayload = DocumentActionPayload & {
  sourceIds: ID[];
};

export type RemoveSlotPayload = DocumentActionPayload & {
  nodeId: ID;
  slotName: string;
};

export type RecoverSnapshotPayload = DocumentActionPayload & {
  snapshot: ISnapshot;
};

export type ChangeMetaPayloads = {
  id: ID;
  meta: INodeMeta;
};

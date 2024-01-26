import { ID, DocumentSelectionMode } from "./types";
import { HistoryableActionType, ITreeNode, NodeChunk, NodeRelativePosition, ISnapshot, CanvasWidthLimits, ViewType, NodesById } from "./document";
import { INodeMeta } from "@rxdrag/schema";


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
    [id in ID]: ITreeNode;
  };
  rootId?: ID;
  title?: string;
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

export type ChangeDocumentTitlePayload = DocumentActionPayload & {
  title?: string;
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

export type ChangeMetaPayloads = DocumentActionPayload & {
  id: ID;
  meta: INodeMeta;
};


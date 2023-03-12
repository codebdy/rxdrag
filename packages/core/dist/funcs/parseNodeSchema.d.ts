import { ID, IDesignerEngine, INodeSchema, ITreeNode, NodeChunk } from "interfaces";
import { NodesById } from "reducers/nodesById";
export declare function parseNodeSchema(engine: IDesignerEngine, documentId: ID, schema: INodeSchema, nodesById: NodesById, isSlot: boolean, parentId?: string): ITreeNode;
export declare function paseNodes(engine: IDesignerEngine, documentId: ID, elements: INodeSchema[] | INodeSchema): NodeChunk;

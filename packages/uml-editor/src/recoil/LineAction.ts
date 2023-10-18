import { RelationType } from "@rxdrag/uml-schema";

export interface LineAction {
  relationType: RelationType;
  sourceNodeId: string;
  tempEdgeId?: string;
}
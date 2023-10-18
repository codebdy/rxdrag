import { RelationType } from "../meta/RelationMeta";

export interface LineAction {
  relationType: RelationType;
  sourceNodeId: string;
  tempEdgeId?: string;
}
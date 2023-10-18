import { DiagramMeta } from "./DiagramMeta";
import { X6NodeMeta } from "./X6NodeMeta";
import { X6EdgeMeta } from "./X6EdgeMeta";
import { UmlContent } from "@rxdrag/uml-schema";

export interface MetaContent extends UmlContent {
  diagrams?: DiagramMeta[];
  x6Nodes?: X6NodeMeta[];
  x6Edges?: X6EdgeMeta[];
}

export const CONST_ID = "id"

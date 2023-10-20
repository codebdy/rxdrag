import { RelationMeta } from "./RelationMeta";
import { PackageMeta } from "./PackageMeta";
import { ClassMeta } from "./ClassMeta";

export interface UmlContent {
  packages?: PackageMeta[];
  classes?: ClassMeta[];
  relations?: RelationMeta[];
}

export const CONST_ID = "id"

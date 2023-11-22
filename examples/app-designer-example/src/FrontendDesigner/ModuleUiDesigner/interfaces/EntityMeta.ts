import { AttributeMeta } from "@rxdrag/uml-schema";
import { AssociationMeta } from "./AssociationMeta";

export interface EntityMeta {
  uuid: string;
  name: string;
  label?: string;
  packageUuid: string;
  attributes: AttributeMeta[];
  associations: AssociationMeta[];
}

import { IActivityMaterial } from "@rxdrag/minions-schema";
import { queryEntitiesMaterial } from "./QueryEntities";
import { queryOneEntityMaterial } from "./QueryOneEntity";
import { saveEntityMaterial } from "./SaveEntity";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const entityActivityMaterials: IActivityMaterial<any, any, any, any>[] = [
  queryEntitiesMaterial,
  queryOneEntityMaterial,
  saveEntityMaterial,
]
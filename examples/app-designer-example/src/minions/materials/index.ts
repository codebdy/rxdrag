import { IActivityMaterial } from "@rxdrag/minions-schema";
import { queryEntitiesMaterial } from "./QueryEntities";
import { queryOneEntityMaterial } from "./QueryOneEntity";
import { saveEntityMaterial } from "./SaveEntity";
import { removeEntityMaterial } from "./RemoveEntity";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const entityActivityMaterials: IActivityMaterial<any, any, any, any>[] = [
  queryEntitiesMaterial,
  queryOneEntityMaterial,
  saveEntityMaterial,
  removeEntityMaterial
]
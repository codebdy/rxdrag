import { infoMessageMaterial } from "./infoMessage";
import { jsCodeMaterial } from "./jsCode";
import { routeToMaterial } from "./routeTo";
import { mockMaterial } from "./mock";
import { IActivityMaterial } from "@rxdrag/minions-schema";
import { customizedLoopMaterial } from "./customizedLoop";
import { arrayToTreeMaterial } from "./arrayToTree";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const commonActivities: IActivityMaterial<any, any, any, any>[] = [
  customizedLoopMaterial,
  routeToMaterial,
  infoMessageMaterial,
  mockMaterial,
  jsCodeMaterial,
  arrayToTreeMaterial
]
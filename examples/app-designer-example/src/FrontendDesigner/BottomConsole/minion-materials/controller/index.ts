import { setPropMaterial } from "./setProp";
import { setVariableMaterial } from "./setVariable";
import { IRxDragActivityMaterial } from "../interfaces";
import { readVariableMaterial } from "./readVariable";
import { listenVariableMaterial } from "./listenVariable";
import { listenPropMaterial } from "./listenProp";
import { readPropMaterial } from "./readProp";
import { reactionMaterial } from "./reaction";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const controllerActivities: IRxDragActivityMaterial<any, any>[] = [
  setPropMaterial,
  listenPropMaterial,
  readPropMaterial,
  setVariableMaterial,
  listenVariableMaterial,
  readVariableMaterial,
  reactionMaterial,
]
import { setPropMaterial } from "./setProp";
import { setVariableMaterial } from "./setVariable";
import { IRxDragActivityMaterial } from "../interfaces";
import { readVariableMaterial } from "./readVariable";
import { listenVariableMaterial } from "./listenVariable";
import { listenPropMaterial } from "./listenProp";
import { readPropMaterial } from "./readProp";
import { reactionMaterial } from "./reaction";
import { eventMaterial } from "./event";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const controllerActivities: IRxDragActivityMaterial<any, any>[] = [
  setPropMaterial,
  listenPropMaterial,
  eventMaterial,
  readPropMaterial,
  setVariableMaterial,
  listenVariableMaterial,
  readVariableMaterial,
  reactionMaterial,
]
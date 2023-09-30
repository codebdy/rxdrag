import { setPropMaterial } from "./setProp";
import { IRxDragActivityMaterial } from "../interfaces";
import { listenPropMaterial } from "./listenProp";
import { reactionMaterial } from "./reaction";
import { eventMaterial } from "./event";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const controllerActivities: IRxDragActivityMaterial<any, any>[] = [
  setPropMaterial,
  listenPropMaterial,
  eventMaterial,
  reactionMaterial,
]
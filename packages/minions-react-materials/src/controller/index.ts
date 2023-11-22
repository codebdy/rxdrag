import { setPropMaterial } from "./setProp";
import { IRxDragActivityMaterial } from "../interfaces";
import { listenPropMaterial } from "./listenProp";
import { reactionMaterial } from "./reaction";
import { eventMaterial } from "./event";

export * from "./utils"
export * from "./event"
export * from "./listenProp"
export * from "./reaction"
export * from "./setProp"
export * from "./fxFlow"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const controllerActivities: IRxDragActivityMaterial<any, any>[] = [
  setPropMaterial,
  listenPropMaterial,
  eventMaterial,
  reactionMaterial,
]
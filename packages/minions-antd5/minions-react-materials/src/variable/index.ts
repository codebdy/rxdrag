import { IRxDragActivityMaterial } from "../interfaces";
import { listenVariableMaterial } from "./listenVariable";
import { readVariableMaterial } from "./readVariable";
import { setVariableMaterial } from "./setVariable";

export * from "./readVariable"
export * from "./listenVariable"
export * from "./setVariable"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const variableActivities: IRxDragActivityMaterial<any, any>[] = [
  readVariableMaterial,
  listenVariableMaterial,
  setVariableMaterial,
]
import { IRxDragActivityMaterial } from "../interfaces";
import { listenVariableMaterial } from "./listenVariable";
import { setVariableMaterial } from "./setVariable";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const variableActivities: IRxDragActivityMaterial<any, any>[] = [
  listenVariableMaterial,
  setVariableMaterial,
]
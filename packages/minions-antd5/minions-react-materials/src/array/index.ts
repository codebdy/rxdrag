import { IRxDragActivityMaterial } from "../interfaces";
import { readIndexMaterial } from "./readIndex";
import { readRowMaterial } from "./readRow";

export * from "./readIndex"
export * from "./readRow"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const arrayActivities: IRxDragActivityMaterial<any, any>[] = [
  readIndexMaterial,
  readRowMaterial,
]
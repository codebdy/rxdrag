import { IActivityMaterial } from "@rxdrag/schema";
import { activityMaterial } from "./reaction";
import { setPropMaterial } from "./setProp";
import { listenVariableMaterial, readVariableMaterial, setVariableMaterial } from "./variable";
import { ReactNode } from "react";

export const controllerReactions: IActivityMaterial<ReactNode>[] = [
  setVariableMaterial,
  listenVariableMaterial,
  setPropMaterial,
  readVariableMaterial,
  activityMaterial,
]

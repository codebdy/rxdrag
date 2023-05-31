import { IActivityMaterial } from "@rxdrag/minions-schema";
import { ReactNode } from "react";
import { setPropMaterial } from "./setProp";
import { setVariableMaterial } from "./setVariable";

export const controllerActivites: IActivityMaterial<ReactNode>[] = [
  setPropMaterial,
  setVariableMaterial,
]
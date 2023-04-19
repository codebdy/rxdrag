import { IReactionMaterial } from "@rxdrag/schema";
import { reactionMaterial } from "./reaction";
import { setPropMaterial } from "./setProp";
import { listenVariableMaterial, readVariableMaterial, setVariableMaterial } from "./variable";
import { ReactNode } from "react";

export const controllerReactions: IReactionMaterial<ReactNode>[] = [
  setVariableMaterial,
  listenVariableMaterial,
  setPropMaterial,
  readVariableMaterial,
  reactionMaterial,
]

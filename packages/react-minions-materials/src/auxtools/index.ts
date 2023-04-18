import { IReactionMaterial } from "@rxdrag/schema";
import { debugMaterial } from "./debug";
import { ReactNode } from "react";

export const auxReactions: IReactionMaterial<ReactNode>[] = [
  debugMaterial,
]
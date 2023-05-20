import { IActivityMaterial } from "@rxdrag/minions-schema";
import { debugMaterial } from "./debug";
import { ReactNode } from "react";

export const auxReactions: IActivityMaterial<ReactNode>[] = [
  debugMaterial,
]
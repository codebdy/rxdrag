import { IActivityMaterial } from "@rxdrag/schema";
import { debugMaterial } from "./debug";
import { ReactNode } from "react";

export const auxReactions: IActivityMaterial<ReactNode>[] = [
  debugMaterial,
]
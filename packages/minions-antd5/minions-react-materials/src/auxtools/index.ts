import { IActivityMaterial } from "@rxdrag/minions-schema";
import { debugMaterial } from "./debug";
import { ReactNode } from "react";

export const auxActivities: IActivityMaterial<ReactNode>[] = [
  debugMaterial,
]
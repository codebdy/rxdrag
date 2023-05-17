import { IActivityMaterial } from "@rxdrag/schema";
import { createContext, ReactNode } from "react";

export const MaterialsContext = createContext<IActivityMaterial<ReactNode>[]>([])
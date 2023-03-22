import { IReactionMaterial } from "@rxdrag/schema";
import { createContext, ReactNode } from "react";

export const MaterialsContext = createContext<IReactionMaterial<ReactNode>[]>([])
import { ReactionMaterialCategory } from "@rxdrag/schema";
import { createContext, ReactNode } from "react";

export const MaterialsContext = createContext<ReactionMaterialCategory<ReactNode>[]>([])
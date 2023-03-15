import { IReactionMaterial } from "@rxdrag/schema";
import { createContext } from "react";

export const MaterialsContext = createContext<IReactionMaterial<React.ReactNode>[]>([])
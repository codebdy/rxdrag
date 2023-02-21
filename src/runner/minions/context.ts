import { createContext } from "react";
import { IReactionMaterial } from "./interfaces/material";

export const MaterialsContext = createContext<IReactionMaterial[]>([])
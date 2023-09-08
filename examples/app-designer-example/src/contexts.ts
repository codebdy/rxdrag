import { createContext } from "react";
import { IApp } from "./interfaces";

export const AppContext = createContext<IApp | undefined>(undefined)
import { createContext } from "react";
import { IDndSnapshot } from "./types";

export const DndSnapshotContext = createContext<IDndSnapshot>({})
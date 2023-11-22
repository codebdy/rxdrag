import { createContext } from "react";
import { DropIndicator, IDndSnapshot } from "./types";
import React from "react";
import { ID } from "@rxdrag/shared";

export const DndSnapshotContext = createContext<IDndSnapshot>({})

export type DropIndicatorState = [DropIndicator | undefined, React.Dispatch<React.SetStateAction<DropIndicator | undefined>>]
export const DropIndicatorContext = createContext<DropIndicatorState | undefined>(undefined)

export const DraggableContext = createContext<ID | undefined>(undefined)

export type IdState = [ID | undefined, React.Dispatch<React.SetStateAction<ID | undefined>>]

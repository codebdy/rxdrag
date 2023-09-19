import { createContext } from "react";
import { ChildItem, DropIndicator, IDndSnapshot, Identifier } from "./types";
import React from "react";

export const DndSnapshotContext = createContext<IDndSnapshot>({})

export type DropIndicatorState = [DropIndicator | undefined, React.Dispatch<React.SetStateAction<DropIndicator | undefined>>]
export const DropIndicatorContext = createContext<DropIndicatorState | undefined>(undefined)

export type ChildItemsState = [ChildItem[], React.Dispatch<React.SetStateAction<ChildItem[]>>]
export const ChildItemsContext = createContext<ChildItemsState | undefined>(undefined)

export const DraggableContext = createContext<Identifier | undefined>(undefined)

export type IdState = [Identifier | undefined, React.Dispatch<React.SetStateAction<Identifier | undefined>>]

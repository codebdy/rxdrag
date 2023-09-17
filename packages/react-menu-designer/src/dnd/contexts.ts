import { createContext } from "react";
import { ChildItem, IDndSnapshot } from "./types";
import React from "react";

export const DndSnapshotContext = createContext<IDndSnapshot>({})

export type TargetIndexState = [number | undefined, React.Dispatch<React.SetStateAction<number | undefined>>]
export const TargetIndexContext = createContext<TargetIndexState | undefined>(undefined)

export type ChildItemsState = [ChildItem[], React.Dispatch<React.SetStateAction<ChildItem[]>>]
export const ChildItemsContext = createContext<ChildItemsState | undefined>(undefined)
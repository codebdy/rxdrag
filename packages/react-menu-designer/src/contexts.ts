import { createContext } from "react";
import { MenuItemMaterials } from "./interfaces";
import { UniqueIdentifier } from "@dnd-kit/core";

export const MaterialsContext = createContext<MenuItemMaterials>({})

export const notMethod = () => { throw new Error("Not implement method") }

export type IdState = [UniqueIdentifier | null, React.Dispatch<React.SetStateAction<UniqueIdentifier | null>>]
export const ActiveIdContext = createContext<IdState>([null, notMethod])
export const OverIdContext = createContext<IdState>([null, notMethod])

export type OffsetState = [number, React.Dispatch<React.SetStateAction<number>>]
export const OffsetLeftContext = createContext<OffsetState>([0, notMethod])

export type PositionType = {
  parentId: UniqueIdentifier | null;
  overId: UniqueIdentifier;
}
export type PositionState = [PositionType | null, React.Dispatch<React.SetStateAction<PositionType | null>>]
export const CurrentPositionContext = createContext<PositionState>([null, notMethod])
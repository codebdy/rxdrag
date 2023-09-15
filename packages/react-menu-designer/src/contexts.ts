import { createContext } from "react";
import { MenuItemResources } from "./interfaces";
import { UniqueIdentifier } from "@dnd-kit/core";
import { TreeItems } from "./types";
import { IFlattenedItem } from "./interfaces/flattened";

export const ResourcesContext = createContext<MenuItemResources>({})

export const notMethod = () => { throw new Error("Not implement method") }

export const initialItems: TreeItems = [
  {
    id: 'Home',
    children: [],
  },
  {
    id: 'Collections',
    children: [
      { id: 'Spring', children: [] },
      { id: 'Summer', children: [] },
      { id: 'Fall', children: [] },
      { id: 'Winter', children: [] },
    ],
  },
  {
    id: 'About Us',
    children: [],
  },
  {
    id: 'My Account',
    children: [
      { id: 'Addresses', children: [] },
      { id: 'Order History', children: [] },
    ],
  },
];

export type ItemsState = [IFlattenedItem[], React.Dispatch<React.SetStateAction<IFlattenedItem[]>>]
export const ItemsContext = createContext<ItemsState>([[], notMethod])
export const ResourceItemsContext = createContext<ItemsState>([[], notMethod])

export type IdState = [UniqueIdentifier | null, React.Dispatch<React.SetStateAction<UniqueIdentifier | null>>]
export const ActiveIdContext = createContext<IdState>([null, notMethod])
export const OverIdContext = createContext<IdState>([null, notMethod])

export type OffsetState = [number, React.Dispatch<React.SetStateAction<number>>]
export const OffsetLeftContext = createContext<OffsetState>([0, notMethod])

export type FlattenedItems = IFlattenedItem[]

export type HistoryRedords = {
  undoList: FlattenedItems[],
  redoList: FlattenedItems[],
  changed?: boolean,
}

export const defautHistory = { undoList: [], redoList: [] }

export type HistoryState = [HistoryRedords, React.Dispatch<React.SetStateAction<HistoryRedords>>]
export const HistoryContext = createContext<HistoryState>([defautHistory, notMethod])
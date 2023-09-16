import { createContext } from "react";
import { IMenuItemResource } from "./interfaces";
import { TreeItems } from "./types";
import { IFlattenedItem } from "./interfaces/flattened";
import { Identifier } from "./dnd/types";

export const ResourcesContext = createContext<IMenuItemResource[]>([])

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

export type IdState = [Identifier | null, React.Dispatch<React.SetStateAction<Identifier | null>>]
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

export type DroppableParams = {
  itemIds: Identifier[],
  over?: boolean,
}

export const defualtDroppableParams = {
  itemIds: []
}
export type DroppableState = [DroppableParams, React.Dispatch<React.SetStateAction<DroppableParams>>]
export const DroppableContext = createContext<DroppableState>([defualtDroppableParams, notMethod])
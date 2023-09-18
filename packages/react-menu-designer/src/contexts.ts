import { createContext } from "react";
import { IMenuItemResource, IMenuItemSchema } from "./interfaces";
import { TreeItems } from "./types";
import { Identifier } from "./dnd/types";
import { IFlattenedItem } from "./interfaces/flattened";

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

export type MenuItems = IFlattenedItem[]

export type HistoryRedords = {
  undoList: MenuItems[],
  redoList: MenuItems[],
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
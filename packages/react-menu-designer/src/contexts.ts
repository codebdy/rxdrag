import { createContext } from "react";
import { IMenuItemResource } from "./interfaces";
import { TreeItems } from "./types";
import { IMenuSchema } from "./interfaces/schema";
import { ID } from "@rxdrag/shared";

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

export type MenuSchemaState = [IMenuSchema, React.Dispatch<React.SetStateAction<IMenuSchema>>]
export const MenuSchemaContext = createContext<MenuSchemaState>([{ rootIds: [], items: [] }, notMethod])
//export const ItemsContext = createContext<IFlattenedItem[]>([])

//export type MenuItems = IFlattenedItem[]

export type HistoryRedords = {
  undoList: IMenuSchema[],
  redoList: IMenuSchema[],
  changed?: boolean,
}

export const defautHistory = { undoList: [], redoList: [] }

export type HistoryState = [HistoryRedords, React.Dispatch<React.SetStateAction<HistoryRedords>>]
export const HistoryContext = createContext<HistoryState>([defautHistory, notMethod])

export type DroppableParams = {
  itemIds: ID[],
  over?: boolean,
}

export const defualtDroppableParams = {
  itemIds: []
}
export type DroppableState = [DroppableParams, React.Dispatch<React.SetStateAction<DroppableParams>>]
export const DroppableContext = createContext<DroppableState>([defualtDroppableParams, notMethod])
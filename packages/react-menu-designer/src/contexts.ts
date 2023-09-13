import { createContext } from "react";
import { MenuItemMaterials } from "./interfaces";
import { UniqueIdentifier } from "@dnd-kit/core";
import { TreeItems } from "./types";

export const MaterialsContext = createContext<MenuItemMaterials>({})

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

export type ItemsState = [TreeItems, React.Dispatch<React.SetStateAction<TreeItems>>]
export const ItemsContext = createContext<ItemsState>([initialItems, notMethod])

export type IdState = [UniqueIdentifier | null, React.Dispatch<React.SetStateAction<UniqueIdentifier | null>>]
export const ActiveIdContext = createContext<IdState>([null, notMethod])
export const OverIdContext = createContext<IdState>([null, notMethod])

export type OffsetState = [number, React.Dispatch<React.SetStateAction<number>>]
export const OffsetLeftContext = createContext<OffsetState>([0, notMethod])

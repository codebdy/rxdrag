import type { MutableRefObject } from 'react';
import { Identifier } from './dnd/types';

export interface TreeItem {
  id: Identifier;
  children: TreeItem[];
  collapsed?: boolean;
}

export type TreeItems = TreeItem[];

export interface FlattenedItem extends TreeItem {
  parentId: Identifier | null;
  depth: number;
  index: number;
}

export type SensorContext = MutableRefObject<{
  items: FlattenedItem[];
  offset: number;
}>;

export enum PostionType {
  in = "in",
  after = "after"
}

export type DropTarget = {
  //如果是nul，表示插入根
  targetId: string | null,
  position: PostionType,
}

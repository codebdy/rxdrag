import { ITreeNode } from "@rxdrag/core";
import { IControllerMeta } from "@rxdrag/minions-runtime-react";


export type ListNode = {
  node: ITreeNode<unknown, IControllerMeta>;
  children?: ListNode[];
};

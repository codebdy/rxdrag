import { NodeContext } from "../contexts";
import { ITreeNode } from "@rxdrag/core";
import { useContext } from "react";

export function useNode(){
  const node = useContext<ITreeNode|undefined>(NodeContext)
  return node;
}
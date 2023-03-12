import { NodeContext } from "core-react/contexts";
import { ITreeNode } from "core/interfaces";
import { useContext } from "react";

export function useNode(){
  const node = useContext<ITreeNode|undefined>(NodeContext)
  return node;
}
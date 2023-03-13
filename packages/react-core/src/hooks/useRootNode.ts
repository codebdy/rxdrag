import { ITreeNode } from "core";
import { useEffect, useState } from "react";
import { useDocument } from "./useDocument";

export function useRootNode(){
  const [rootNode, setRootNode] = useState<ITreeNode|null>()
  const doc = useDocument();

  useEffect(()=>{
    setRootNode(doc?.getRootNode())
  }, [doc])

  return rootNode
}
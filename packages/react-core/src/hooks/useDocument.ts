import { IDocument } from "@rxdrag/core";
import { useContext } from "react";
import { DocumentContext } from "../contexts";

export function useDocument(){
  const doc = useContext<IDocument|undefined>(DocumentContext)
  return doc;
}
import { IDocument } from "core";
import { useContext } from "react";
import { DocumentContext } from "core-react/contexts";

export function useDocument(){
  const doc = useContext<IDocument|undefined>(DocumentContext)
  return doc;
}
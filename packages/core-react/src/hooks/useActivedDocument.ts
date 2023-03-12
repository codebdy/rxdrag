import { useActivedDocumentIdState } from "./useActivedDocumentIdState";
import { useDesignerEngine } from "./useDesignerEngine";

export function useActivedDocument() {
  const [activedId] = useActivedDocumentIdState()
  const engine = useDesignerEngine()

  return engine?.getDocument(activedId || "")
}
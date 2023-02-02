import { useEditorStore } from "./useEditorStore";

export function useSelectedEdge() {
  const { selected, metas } = useEditorStore()

  return metas?.invokes?.find(invoke => invoke.id === selected)
}
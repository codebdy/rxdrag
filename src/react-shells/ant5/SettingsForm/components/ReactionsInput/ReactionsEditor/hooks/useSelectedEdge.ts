import { useEditorState } from "./useEditorState";

export function useSelectedEdge() {
  const { selected, metas } = useEditorState()

  return metas?.invokes?.find(invoke => invoke.id === selected)
}
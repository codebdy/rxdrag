import { useEditorState } from "./useEditorState";

export function useSelectedNode() {
  const { selected, metas } = useEditorState()

  return metas?.reactions?.find(reaction => reaction.id === selected)
}
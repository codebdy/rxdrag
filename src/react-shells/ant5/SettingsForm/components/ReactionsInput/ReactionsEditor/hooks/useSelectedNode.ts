import { useEditorState } from "./useEditorState";

export function useSelectedNode() {
  const { selected, metas } = useEditorState()
  console.log("哈哈 useSelectedNode")
  return metas?.reactions?.find(reaction => reaction.id === selected)
}
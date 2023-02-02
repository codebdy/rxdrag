import { useEditorStore } from "./useEditorStore";

export function useSelectedNode() {
  const { selected, metas } = useEditorStore()
  console.log("哈哈 useSelectedNode")
  return metas?.reactions?.find(reaction => reaction.id === selected)
}
import { useMetas } from "./useMetas";
import { useSelected } from "./useSelected";

export function useSelectedEdge() {
  const { selected } = useSelected()
  const { metas } = useMetas()

  const lineMeta = metas?.lines?.find(line => line.id === selected)
  if (lineMeta) {
    return lineMeta
  }

  for (const node of metas?.nodes || []) {
    for (const child of node.children?.lines || []) {
      if (child.id === selected) {
        return child
      }
    }
  }
  return
}
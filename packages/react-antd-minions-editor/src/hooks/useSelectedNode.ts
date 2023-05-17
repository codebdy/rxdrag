import { useMetas } from "./useMetas";
import { useSelected } from "./useSelected";

export function useSelectedNode() {
  const { selected } = useSelected()
  const { metas } = useMetas()

  return metas?.nodes?.find(node => node.id === selected)
}
import { useMetas } from "./useMetas";
import { useSelected } from "./useSelected";

export function useSelectedNode() {
  const { selected } = useSelected()
  const { metas } = useMetas()

  console.log("哈哈", metas, selected)

  return metas?.nodes?.find(node => node.id === selected)
}
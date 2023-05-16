import { useMetas } from "./useMetas";
import { useSelected } from "./useSelected";

export function useSelectedEdge() {
  const { selected } = useSelected()
  const { metas } = useMetas()

  return metas?.lines?.find(line => line.id === selected)
}
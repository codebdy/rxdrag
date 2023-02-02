import { useMetas } from "./useMetas";
import { useSelected } from "./useSelected";

export function useSelectedEdge() {
  const { selected } = useSelected()
  const { metas } = useMetas()

  return metas?.invokes?.find(invoke => invoke.id === selected)
}
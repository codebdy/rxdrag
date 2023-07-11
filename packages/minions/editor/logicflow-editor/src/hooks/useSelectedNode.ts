import { useMetas } from "./useMetas";
import { useSelected } from "./useSelected";

export function useSelectedNode() {
  const { selected } = useSelected()
  const { metas } = useMetas()

  const nodeMeta = metas?.nodes?.find(node => node.id === selected)
  if(nodeMeta){
    return nodeMeta
  }

  for(const node of metas?.nodes||[]){
    for(const child of node.children?.nodes||[]){
      if(child.id === selected){
        return child
      }
    }
  }
}
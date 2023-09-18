import { useMemo } from "react";
import { useActiveIdState } from "./useActiveIdState";
import { useItemsState } from "./useItemsState";

export function useShowingItems(){
  const [activeId] = useActiveIdState()
  const [items] = useItemsState()

  const showingItems = useMemo(()=>{
    if(!activeId){
      return items
    }
    return items.filter(item=>item.id !== activeId && item.parentId != activeId)
  },[activeId, items])

  return showingItems
}
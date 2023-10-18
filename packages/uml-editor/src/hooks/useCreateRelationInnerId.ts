import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { ID } from "shared";
import { relationsState } from "../recoil/atoms";

export function useCreateRelationInnerId(metaId: ID) {
  const relations = useRecoilValue(relationsState(metaId));
  const findRelationByInnerId = useCallback((id:number)=>{
    for (const relation of relations) {
      if(relation.innerId === id ){
        return relation
      }
    }
  }, [relations])

  const createInnerId = useCallback((): number => {
    //从1001开始表id，前1000个为系统预留
    let index = 1001;
    while (findRelationByInnerId(index)) {
      index++;
    }

    return index;
  }, [findRelationByInnerId]);

  return createInnerId;
}

import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { ID } from "shared";
import { classesState } from "../recoil/atoms";
import { useChangeClass } from "./useChangeClass";

export function useDeleteAttribute(metaId: ID) {
  const changeClass = useChangeClass(metaId);
  const clses = useRecoilValue(classesState(metaId))

  const deleteAttribute = useCallback(
    (attributeUuid: string) => {
      for(const cls of clses){
        if(cls.attributes.find((attr) => attr.uuid === attributeUuid)){
          changeClass({
            ...cls,
            attributes: cls.attributes.filter(
              (atr) => atr.uuid !== attributeUuid
            ),
          })
        }
      }
    },
    [changeClass, clses]
  );

  return deleteAttribute;
}

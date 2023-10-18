import { useRecoilValue } from 'recoil';
import { classesState } from "../recoil/atoms";
import { useCallback } from 'react';
import { ID } from '@rxdrag/shared';

export function useIsElement(metaId: ID) {
  const classes = useRecoilValue(classesState(metaId));

  const isElement = useCallback((uuid: string) => {
    for (const cls of classes) {
      if (cls.uuid === uuid) {
        return true;
      }
      if(cls.attributes){
        for (const attr of cls.attributes) {
          if (attr.uuid === uuid) {
            return true;
          }
        }        
      }
    }
    return false
  }, [classes])

  return isElement
}
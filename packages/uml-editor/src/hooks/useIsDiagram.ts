import { useRecoilValue } from 'recoil';
import { diagramsState } from "../recoil/atoms";
import { useCallback } from 'react';
import { ID } from '@rxdrag/shared';

export function useIsDiagram(metaId: ID) {
  const diagrams = useRecoilValue(diagramsState(metaId))

  const isDiagram = useCallback((uuid: string) => {
    return diagrams.find(d => d.uuid === uuid)
  }, [diagrams])

  return isDiagram
}
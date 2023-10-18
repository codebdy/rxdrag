import { ID } from "shared";
import { useRecoilValue } from 'recoil';
import { diagramsState } from "../recoil/atoms";
import { selectedUmlDiagramState } from '../recoil/atoms';

export function useSelectedDiagramPackageUuid(metaId: ID) {
  const diagrams = useRecoilValue(diagramsState(metaId));
  const selectedDiagramId = useRecoilValue(selectedUmlDiagramState(metaId));
  return diagrams.find(diagram => diagram.uuid === selectedDiagramId)?.packageUuid;
}
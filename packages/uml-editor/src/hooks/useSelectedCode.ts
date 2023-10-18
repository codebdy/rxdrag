import { codesState, selectedCodeIdState } from "UmlEditor/recoil/atoms";
import { useRecoilValue } from "recoil";
import { useMetaId } from "./useMetaId";

export function useSelectedCode() {
  const metaId = useMetaId();
  const codes = useRecoilValue(codesState(metaId))
  const selectId = useRecoilValue(selectedCodeIdState(metaId))

  return codes?.find(code=>code.uuid === selectId)
}
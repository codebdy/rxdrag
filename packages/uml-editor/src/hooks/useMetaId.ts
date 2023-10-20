import { useRecoilValue } from "recoil";
import { metaIdState } from "../recoil/atoms";

export function useMetaId(){
  const metaId = useRecoilValue(metaIdState)

  return metaId
}
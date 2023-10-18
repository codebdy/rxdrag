import { useRecoilValue } from "recoil";
import { classesState } from "../recoil/atoms";
import { ID } from "@rxdrag/shared";

export function useClass(uuid: string, metaId: ID) {
  const entites = useRecoilValue(classesState(metaId));

  return entites.find((cls) => cls.uuid === uuid);
}

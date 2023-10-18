import { useRecoilValue } from "recoil";
import { ID } from "shared";
import { classesState } from "../recoil/atoms";

export function useClass(uuid: string, metaId: ID) {
  const entites = useRecoilValue(classesState(metaId));

  return entites.find((cls) => cls.uuid === uuid);
}

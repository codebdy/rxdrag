import { useMemo } from "react";
import { useRecoilValue } from "recoil";
import { ID } from "shared";
import { StereoType } from "../meta/ClassMeta";
import { classesState } from "../recoil/atoms";

export function useEntities(metaId: ID) {
  const classes = useRecoilValue(classesState(metaId));
  const entities = useMemo(() => {
    return classes.filter((cls) => cls.stereoType === StereoType.Entity);
  }, [classes]);

  return entities;
}

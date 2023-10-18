import { useCallback } from "react";
import { Types } from "../meta/Type";
import { ClassMeta, StereoType } from "../meta/ClassMeta";
import { CONST_ID } from "../meta/Meta";
import { useCreateClassInnerId } from "./useCreateClassInnerId";
import { useGetClassByName } from "./useGetClassByName";
import { createUuid, ID } from "shared";

export function useCreateNewClass(metaId: ID) {
  const getClassByName = useGetClassByName(metaId);
  const createInnerId = useCreateClassInnerId(metaId);

  const getNewClassName = useCallback(() => {
    const prefix = "NewClass";
    let index = 1;
    while (getClassByName(prefix + index)) {
      index++;
    }

    return prefix + index;
  }, [getClassByName]);

  const createNewClass = useCallback(
    (stereoType: StereoType, packageUuid: string) => {
      const newClass: ClassMeta = {
        uuid: createUuid(),
        innerId: createInnerId(),
        name: getNewClassName(),
        stereoType: stereoType,
        packageUuid,
        root: stereoType === StereoType.Service,
        attributes:
          stereoType === StereoType.Enum ||
            stereoType === StereoType.ValueObject ||
            stereoType === StereoType.Service
            ? []
            : [
              {
                uuid: createUuid(),
                name: CONST_ID,
                type: Types.ID,
                primary: true,
                typeLabel: Types.ID,
              },
            ],
      };
      //setEntities((entites) => [...entites, newEntity]);
      return newClass;
    },
    [createInnerId, getNewClassName]
  );

  return createNewClass;
}

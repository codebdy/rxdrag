import { useCallback } from "react";
import { useCreateClassInnerId } from "./useCreateClassInnerId";
import { useGetClassByName } from "./useGetClassByName";
import { ID, createId } from "@rxdrag/shared";
import { StereoType, ClassMeta, CONST_ID, Types } from "@rxdrag/uml-schema";

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
        uuid: createId(),
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
                uuid: createId(),
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

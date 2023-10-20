import { useCallback } from "react";
import { useGetTypeLabel } from "./useGetTypeLabel";
import { ID, createId } from "@rxdrag/shared";
import { AttributeMeta, Types } from "@rxdrag/uml-schema";

export function useCreateAttribute(metaId: ID, prefix?: string) {
  const getTypeName = useGetTypeLabel(metaId);

  const createAttribute = useCallback(
    (attributes: AttributeMeta[]) => {
      let index = 1;
      const namePrefix = prefix || "newAttribute";
      while (
        // eslint-disable-next-line no-loop-func
        attributes.find((attr) => attr.name === namePrefix + index)
      ) {
        index++;
      }

      const attr = {
        uuid: createId(),
        name: namePrefix + index,
        type: Types.String,
        typeLabel: getTypeName(Types.String),
      };

      return attr;
    },
    [getTypeName, prefix]
  );

  return createAttribute;
}

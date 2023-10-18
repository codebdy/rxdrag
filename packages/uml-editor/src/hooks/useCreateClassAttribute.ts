import { useCallback } from "react";
import { useChangeClass } from "./useChangeClass";
import { useCreateAttribute } from "./useCreateAttribute";
import { ID } from "@rxdrag/shared";
import { ClassMeta } from "@rxdrag/uml-schema";

export function useCreateClassAttribute(metaId: ID) {
  const changeClass = useChangeClass(metaId);
  const createAttribute = useCreateAttribute(metaId);
  const createClassAttribute = useCallback(
    (cls: ClassMeta) => {
      const attr = createAttribute(cls.attributes);
      changeClass({ ...cls, attributes: [...cls.attributes, attr] });
      return attr
    },
    [changeClass, createAttribute]
  );

  return createClassAttribute;
}

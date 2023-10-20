import { useCallback } from "react";
import { useChangeClass } from "./useChangeClass";
import { useCheckClassPropertyName } from "./useCheckClassPropertyName";
import { useTranslate } from "@rxdrag/react-locales";
import { ID } from "@rxdrag/shared";
import { AttributeMeta, ClassMeta } from "@rxdrag/uml-schema";

export function useChangeAttribute(metaId: ID) {
  const changeEntity = useChangeClass(metaId);
  const chackName = useCheckClassPropertyName(metaId);
  const t = useTranslate();

  const changeAttribute = useCallback(
    (attr: AttributeMeta, cls: ClassMeta) => {
      if (!chackName(cls.uuid, attr.name, attr.uuid)) {
        return t("ErrorNameRepeat");
      }
      changeEntity({
        ...cls,
        attributes: cls.attributes.map((col) =>
          col.uuid === attr.uuid ? attr : col
        ),
      });
    },
    [chackName, changeEntity, t]
  );

  return changeAttribute;
}

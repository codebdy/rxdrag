import { useCallback } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { EVENT_CLASS_CHANGED, triggerCanvasEvent } from "../GraphCanvas/events";
import { classesState } from "../recoil/atoms";
import { useBackupSnapshot } from "./useBackupSnapshot";
import { useTranslate } from "@rxdrag/react-locales";
import { ID } from "@rxdrag/shared";
import { ClassMeta } from "@rxdrag/uml-schema";

export function useChangeClass(metaId: ID) {
  const backupSnapshot = useBackupSnapshot(metaId);
  const setClasses = useSetRecoilState(classesState(metaId));
  const classes = useRecoilValue(classesState(metaId));
  const t = useTranslate();

  const changeClass = useCallback(
    (cls: ClassMeta) => {
      if (
        classes
          .filter((cl) => cl.uuid !== cls.uuid)
          .find((cl) => cl.name === cls.name)
      ) {
        return t("ErrorNameRepeat");
      }
      backupSnapshot();
      setClasses((entities) =>
        entities.map((ent) => (ent.uuid === cls.uuid ? cls : ent))
      );
      triggerCanvasEvent({ name: EVENT_CLASS_CHANGED, detail: cls });
      return undefined;
    },
    [backupSnapshot, classes, setClasses, t]
  );

  return changeClass;
}

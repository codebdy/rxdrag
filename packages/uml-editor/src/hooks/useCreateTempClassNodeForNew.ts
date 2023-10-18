import { useCallback } from "react";
import { useCreateNewClass } from "./useCreateNewClass";
import { NODE_INIT_SIZE } from "../GraphCanvas/nodeInitSize";
import { useSelectedDiagramPackageId } from "./useSelectedDiagramPackageId";
import { useRecoilValue } from "recoil";
import { useToken } from "antd/es/theme/internal";
import { ID } from "@rxdrag/shared";
import { StereoType } from "@rxdrag/uml-schema";
import { themeModeState } from "../recoil/atoms";

export function useCreateTempClassNodeForNew(metaId: ID) {
  const packageUuid = useSelectedDiagramPackageId(metaId)
  const creatNewClassMeta = useCreateNewClass(metaId);
  const themeMode = useRecoilValue(themeModeState);
  const [, token] = useToken();
  const createTempClassNodeForNew = useCallback(
    (stereoType: StereoType) => {
      if (!packageUuid) {
        return
      }
      const classMeta = creatNewClassMeta(stereoType, packageUuid);

      return {
        uuid: "entityMeta.uuid",
        ...NODE_INIT_SIZE,
        
        shape: "class-node",
        data: {
          ...classMeta,
          themeMode,
          backgroundColor: token.colorBgBase,
          textColor: token.colorText,
          //root: stereoType === StereoType.Partial,
          isTempForNew: true,
        },
      };
    },
    [creatNewClassMeta, packageUuid, themeMode, token.colorBgBase, token.colorText]
  );
  return createTempClassNodeForNew;
}

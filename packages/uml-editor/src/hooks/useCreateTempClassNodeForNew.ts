import { useCallback } from "react";
import { useCreateNewClass } from "./useCreateNewClass";
import { NODE_INIT_SIZE } from "../GraphCanvas/nodeInitSize";
import { StereoType } from "../meta/ClassMeta";
import { ID } from "shared";
import { useSelectedDiagramPackageUuid } from "./useSelectedDiagramPackageUuid";
import { useRecoilValue } from "recoil";
import { themeModeState } from "recoil/atoms";
import { useToken } from "antd/es/theme/internal";

export function useCreateTempClassNodeForNew(metaId: ID) {
  const packageUuid = useSelectedDiagramPackageUuid(metaId)
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

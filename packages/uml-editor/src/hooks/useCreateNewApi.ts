import { useCallback } from "react";
import { useBackupSnapshot } from "./useBackupSnapshot";
import { apisState, selectedApiIdState, selectedCodeIdState, selectedElementState, selectedGraphLogicIdState, selectedScriptLogicIdState, selectedUmlDiagramState } from "../recoil/atoms";
import { useSetRecoilState } from "recoil";
import { MethodMeta, MethodOperateType, Types } from "../meta";
import { ID, createUuid } from "shared";
import { useGetApiByName } from "./useGetApiByName";

export function useCreateNewApi(metaId: ID) {
  const getByName = useGetApiByName(metaId);
  const backup = useBackupSnapshot(metaId);
  const setApis = useSetRecoilState(apisState(metaId));
  const setSelectedScriptLogicId = useSetRecoilState(selectedScriptLogicIdState(metaId));
  const setSelectedGraphLogicId = useSetRecoilState(selectedGraphLogicIdState(metaId));
  const setSelectedCodeId = useSetRecoilState(selectedCodeIdState(metaId));
  const setSelectedDiagram = useSetRecoilState(
    selectedUmlDiagramState(metaId)
  );
  const setSelectedApiId = useSetRecoilState(selectedApiIdState(metaId));
  const setSelectedElement = useSetRecoilState(selectedElementState(metaId));

  const getNewName = useCallback(() => {
    const prefix = "newApi";
    let index = 1;
    while (getByName(prefix + index)) {
      index++;
    }

    return prefix + index;
  }, [getByName]);

  const createNewApi = useCallback((operateType: MethodOperateType) => {
    backup()
    const newApi: MethodMeta = {
      uuid: createUuid(),
      name: getNewName(),
      logicScript: "",
      operateType,
      type: Types.String,
      args: [],
      typeLabel: "String",
    };
    setApis(apis => [...apis, newApi]);
    setSelectedApiId(newApi.uuid)
    setSelectedScriptLogicId(undefined);
    setSelectedGraphLogicId(undefined);
    setSelectedCodeId(undefined);
    setSelectedDiagram(undefined);
    setSelectedElement(undefined);
  }, [backup, getNewName, setApis, setSelectedApiId, setSelectedScriptLogicId, setSelectedGraphLogicId, setSelectedCodeId, setSelectedDiagram, setSelectedElement]);

  return createNewApi;
}

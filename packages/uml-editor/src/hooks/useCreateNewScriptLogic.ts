import { useCallback } from "react";
import { useBackupSnapshot } from "./useBackupSnapshot";
import { scriptLogicsState, selectedApiIdState, selectedCodeIdState, selectedElementState, selectedGraphLogicIdState, selectedScriptLogicIdState, selectedUmlDiagramState } from "../recoil/atoms";
import { useSetRecoilState } from "recoil";
import { useGetScriptLogicByName } from "./useGetScriptLogicByName";
import { MethodMeta, MethodOperateType, Types } from "../meta";
import { ID, createUuid } from "shared";

export function useCreateNewScriptLogic(metaId: ID) {
  const getByName = useGetScriptLogicByName(metaId);
  const backup = useBackupSnapshot(metaId);
  const setScriptLogics = useSetRecoilState(scriptLogicsState(metaId));
  const setSelectedScriptLogicId = useSetRecoilState(selectedScriptLogicIdState(metaId));
  const setSelectedGraphLogicId = useSetRecoilState(selectedGraphLogicIdState(metaId));
  const setSelectedCodeId = useSetRecoilState(selectedCodeIdState(metaId));
  const setSelectedApiId = useSetRecoilState(selectedApiIdState(metaId));
  const setSelectedDiagram = useSetRecoilState(
    selectedUmlDiagramState(metaId)
  );
  const setSelectedElement = useSetRecoilState(selectedElementState(metaId));

  const getNewName = useCallback(() => {
    const prefix = "newScript";
    let index = 1;
    while (getByName(prefix + index)) {
      index++;
    }

    return prefix + index;
  }, [getByName]);

  const createNewScriptLogic = useCallback((operateType: MethodOperateType) => {
    backup()
    const newScriptLogic: MethodMeta = {
      uuid: createUuid(),
      name: getNewName(),
      logicScript: "",
      operateType,
      type: Types.String,
      args: [],
      typeLabel: "String",
    };
    setScriptLogics(orchestrations => [...orchestrations, newScriptLogic]);
    setSelectedScriptLogicId(newScriptLogic.uuid);
    setSelectedGraphLogicId(undefined);
    setSelectedCodeId(undefined);
    setSelectedDiagram(undefined);
    setSelectedApiId(undefined);
    setSelectedElement(undefined);
  }, [backup, getNewName, setScriptLogics, setSelectedScriptLogicId, setSelectedGraphLogicId, setSelectedCodeId, setSelectedDiagram, setSelectedApiId, setSelectedElement]);

  return createNewScriptLogic;
}

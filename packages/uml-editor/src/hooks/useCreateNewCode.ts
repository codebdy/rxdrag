import { useCallback } from "react";
import { useBackupSnapshot } from "./useBackupSnapshot";
import { codesState, selectedApiIdState, selectedCodeIdState, selectedElementState, selectedGraphLogicIdState, selectedScriptLogicIdState, selectedUmlDiagramState } from "../recoil/atoms";
import { useSetRecoilState } from "recoil";
import { ID, createUuid } from "shared";
import { CodeMeta } from "UmlEditor/meta/CodeMeta";

export function useCreateNewCode(metaId: ID) {
  const backup = useBackupSnapshot(metaId);
  const setCodes = useSetRecoilState(codesState(metaId));
  const setSelectedScriptLogicId = useSetRecoilState(selectedScriptLogicIdState(metaId));
  const setSelectedGraphLogicId = useSetRecoilState(selectedGraphLogicIdState(metaId));
  const setSelectedCodeId = useSetRecoilState(selectedCodeIdState(metaId));
  const setSelectedApiId = useSetRecoilState(selectedApiIdState(metaId));
  const setSelectedDiagram = useSetRecoilState(
    selectedUmlDiagramState(metaId)
  );
  const setSelectedElement = useSetRecoilState(selectedElementState(metaId));


  const createNewCode = useCallback(() => {
    backup()
    const newCode: CodeMeta = {
      uuid: createUuid(),
      name: "newCode",
      scriptText: "",
    };
    setCodes(codes => [...codes, newCode]);
    setSelectedCodeId(newCode.uuid);
    setSelectedScriptLogicId(undefined);
    setSelectedGraphLogicId(undefined);
    setSelectedDiagram(undefined);
    setSelectedApiId(undefined);
    setSelectedElement(undefined);
  }, [backup, setCodes, setSelectedCodeId, setSelectedScriptLogicId, setSelectedGraphLogicId, setSelectedDiagram, setSelectedApiId, setSelectedElement]);

  return createNewCode;
}

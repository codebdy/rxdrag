import React, { useCallback, useEffect, useState } from "react";
import { memo } from "react";
import { useBackupSnapshot } from "../../hooks/useBackupSnapshot";
import { useSetRecoilState } from 'recoil';
import { diagramsState } from '../../recoil/atoms';
import DiagramAction from "./DiagramAction";
import { useGetPackage } from "../../hooks/useGetPackage";
import { useMetaId } from "../../hooks/useMetaId";
import { DiagramDialog } from "./DiagramDialog";
import { DiagramMeta } from "../../interfaces";
import TreeNodeLabel from "../TreeNodeLabel";

const DiagramLabel = memo((
  props: {
    diagram: DiagramMeta
  }
) => {
  const { diagram } = props;
  const [name, setName] = useState(diagram.name);
  const [editing, setEditing] = useState(false);
  const [visible, setVisible] = useState(false);
  const metaId = useMetaId();
  const backup = useBackupSnapshot(metaId);
  const setDiagrams = useSetRecoilState(diagramsState(metaId));
  const getPagcage = useGetPackage(metaId)

  useEffect(() => {
    setName(diagram.name)
  }, [diagram])

  const handleVisableChange = useCallback((visible: any) => {
    setVisible(visible)
  }, []);

  const handleEdit = useCallback(() => {
    setEditing(true);
  }, []);

  const handleConfirm = useCallback((diagram?: DiagramMeta) => {
    backup()
    setEditing(false);
    setDiagrams(diagrams => diagrams.map(dm => dm.uuid === diagram?.uuid ? diagram : dm) as any)
  }, [backup, setDiagrams]);


  const handleClose = useCallback(() => {
    setEditing(false);
  }, [])

  return (
    <TreeNodeLabel
      fixedAction={visible || (!getPagcage(diagram.packageUuid)?.system)}
      action={
        !editing ?
          <DiagramAction diagram={diagram}
            onEdit={handleEdit}
            onVisibleChange={handleVisableChange} /> : undefined
      }
      onClick={e => editing ? e.stopPropagation() : undefined}
    >
      <div>{name}</div>
      {
        editing &&
        <DiagramDialog
          open={editing}
          diagram={diagram}
          onClose={handleClose}
          onConfirm={handleConfirm}
        />
      }
    </TreeNodeLabel>
  )
})

export default DiagramLabel;
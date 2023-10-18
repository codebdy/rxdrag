import React, { useCallback, useEffect, useState } from "react";
import { memo } from "react";
import { useBackupSnapshot } from "../../hooks/useBackupSnapshot";
import PackageAction from "./PackageAction";
import { useSetRecoilState } from 'recoil';
import { packagesState } from '../../recoil/atoms';
import { useMetaId } from "../../hooks/useMetaId";
import { PackageDialog } from "./PackageDialog";
import { PackageMeta } from "@rxdrag/uml-schema";
import TreeNodeLabel from "../TreeNodeLabel";

const PackageLabel = memo((
  props: {
    pkg: PackageMeta
  }
) => {
  const { pkg } = props;
  const [name, setName] = useState(pkg.name);
  const [editing, setEditing] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setName(pkg.name)
  }, [pkg])

  const metaId = useMetaId();
  const backup = useBackupSnapshot(metaId);
  const setPackages = useSetRecoilState(packagesState(metaId));

  const handleVisableChange = useCallback((visible: any) => {
    setVisible(visible)
  }, []);

  const handleEdit = useCallback(() => {
    setEditing(true);
  }, []);


  const handleEditFinish = useCallback((newPkg?: PackageMeta) => {
    backup()
    setEditing(false);
    setPackages(packages => packages.map(pg => pg.uuid === newPkg?.uuid ? newPkg : pg) as any)
  }, [backup, setPackages])

  const handleClose = useCallback(() => {
    setEditing(false);
  }, [])

  return (
    <TreeNodeLabel
      fixedAction={visible || (!pkg.system)}
      action={!editing ?
        <PackageAction pkg={pkg}
          onEdit={handleEdit}
          onVisibleChange={handleVisableChange} /> : undefined
      }
      onClick={e => editing ? e.stopPropagation() : undefined}
    >
      <div>{name}</div>
      {
        editing &&
        <PackageDialog pkg={pkg} open={editing} onClose={handleClose} onConfirm={handleEditFinish} />
      }
    </TreeNodeLabel>
  )
})

export default PackageLabel;
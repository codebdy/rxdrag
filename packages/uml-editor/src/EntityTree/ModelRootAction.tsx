import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { memo, useCallback, useState } from "react"
import { useCreateNewPackage } from '../hooks/useCreateNewPackage';
import { useSetRecoilState } from 'recoil';
import { packagesState } from "../recoil/atoms";
import { useBackupSnapshot } from "../hooks/useBackupSnapshot";
import { PackageDialog } from "./PackageLabel/PackageDialog";
import { useMetaId } from "../hooks/useMetaId";
import { PackageMeta } from "@rxdrag/uml-schema";

export const ModelRootAction = memo(() => {
  const metaId = useMetaId();
  const [newPackage, setNewPackage] = useState<PackageMeta>();
  const setPackages = useSetRecoilState(packagesState(metaId));
  const createNewPackage = useCreateNewPackage(metaId);
  const backup = useBackupSnapshot(metaId);

  const handleAddPackage = useCallback(
    () => {
      setNewPackage(createNewPackage());
    },
    [createNewPackage],
  );

  const handleClose = useCallback(() => {
    setNewPackage(undefined);
  }, [])

  const handleConfirm = useCallback((pkg: PackageMeta) => {
    backup();
    setPackages(packages => [...packages, pkg]);
    setNewPackage(undefined);
  }, [backup, setPackages])

  return (
    <>
      <Button shape='circle' type="text" size='small' onClick={handleAddPackage}>
        <PlusOutlined />
      </Button>
      {
        newPackage &&
        <PackageDialog
          pkg={newPackage}
          open={!!newPackage}
          onClose={handleClose}
          onConfirm={handleConfirm}
        />
      }

    </>
  )
})
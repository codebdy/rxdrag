import { useBackupSnapshot } from "./useBackupSnapshot";
import { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
import { packagesState } from './../recoil/atoms';
import { ID } from "@rxdrag/shared";

/**
 * 并没有删除包下面的元素，保存数据时需要过滤一下
 * @returns 
 */
export function useDeletePackage(metaId: ID) {
  const setPackages = useSetRecoilState(packagesState(metaId));
  const backup = useBackupSnapshot(metaId);

  const deletePackage = useCallback((uuid: string) => {
    backup()
    setPackages(packages => packages.filter(pkg => pkg.uuid !== uuid))
  }, [backup, setPackages])

  return deletePackage
}
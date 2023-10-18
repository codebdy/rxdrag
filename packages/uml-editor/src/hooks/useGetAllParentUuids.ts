import { useCallback } from "react";
import { ID } from "shared";
import { useGetFirstParentUuids } from "./useGetFirstParentUuids";

export function useGetAllParentUuids(metaId: ID) {
  const getFirstParentId = useGetFirstParentUuids(metaId);

  const getParentUuids = useCallback(
    (uuid: string) => {
      const parents: string[] = [];
      let currentUuids: string[] = [uuid];
      do {
        const newCurrentIds: string[] = [];
        for (const curenttId of currentUuids) {
          const uuids = getFirstParentId(curenttId);
          newCurrentIds.push(...uuids);
          parents.push(...uuids);
        }
        currentUuids = newCurrentIds;
      } while (currentUuids.length > 0);

      return parents;
    },
    [getFirstParentId]
  );

  return getParentUuids;
}

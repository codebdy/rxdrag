import { useCallback } from "react";
import { useGetFirstParentIds } from "./useGetFirstParentIds";
import { ID } from "@rxdrag/shared";

export function useGetAllParentIds(metaId: ID) {
  const getFirstParentId = useGetFirstParentIds(metaId);

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

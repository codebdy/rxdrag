import { getTheFiles } from "@rxdrag/shared";
import { useCallback } from "react";

export function useOpenFile(accept = ".zip") {
  const open = useCallback(async () => {
    const fileHandles = await getTheFiles(accept, false)
    const files = await fileHandles.map(async (fileHandle: any) => {
      return await fileHandle.getFile();
    })
    return files?.[0]
  }, [accept])

  return open;
}
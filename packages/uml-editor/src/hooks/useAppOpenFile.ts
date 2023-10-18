import { useCallback } from "react";

export async function getTheFiles(accept: string, multiple?: boolean) {
  // open file picker
  const fileHandles = await (window as any).showOpenFilePicker({
    types: [{
      accept: {
        "file/*": accept?.split(",")
      },
    }],
    excludeAcceptAllOption: false,
    multiple: multiple,
  });

  return fileHandles;
}

export function useOpenFile(accept: string = ".zip") {
  const open = useCallback(async () => {
    const fileHandles = await getTheFiles(accept, false)
    const files = await fileHandles.map(async (fileHandle: any) => {
      return await fileHandle.getFile();
    })
    return files?.[0]
  }, [accept])

  return open;
}
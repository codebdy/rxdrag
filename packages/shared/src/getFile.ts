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
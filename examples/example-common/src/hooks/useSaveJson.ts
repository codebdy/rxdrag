import { useActivedDocument } from "@rxdrag/react-core";
import { message } from "antd";
import { useCallback } from "react";
import { saveFile } from "./helper/saveFile";

export function useSaveJson(){
  const doc = useActivedDocument()
  
  const doSave = useCallback(() => {
    const json= doc?.getSchemaTree()
    saveFile('rxeditor-json', JSON.stringify(json||{}, null, 2)).then(
      (savedName) => {
        if (savedName) {
          message.success("保存成功")
        }
      }
    );
  }, [doc]);

  return doSave
}
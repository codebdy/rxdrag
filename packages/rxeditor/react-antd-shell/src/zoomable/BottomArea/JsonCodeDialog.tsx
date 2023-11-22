import { Button, Modal, Tooltip } from "antd";
import { memo, useCallback, useState } from "react"
import { SvgIcon } from "../../common";
import { useActivedDocument, useSettersTranslate, useThemeMode } from "@rxdrag/react-core";
import Editor from 'react-monaco-editor';
import { jsonIcon } from "@rxdrag/react-shared";

export const JsonCodeDialog = memo(() => {
  const [open, setOpen] = useState(false);
  const t = useSettersTranslate()
  const doc = useActivedDocument()
  const themeMode = useThemeMode()
  const jsonStr = JSON.stringify(doc?.getSchemaTree() || {}, null, 2)

  const handleClick = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [])

  return (
    <>
      <Tooltip title={t("jsonCode")}>
        <div>
          <Button
            type={"text"}
            size="small"
            icon={
              <SvgIcon>
                {jsonIcon}
              </SvgIcon>
            }
            onClick={handleClick}
          />
        </div>
      </Tooltip>
      <Modal
        title={doc?.getTitle() + " - " + t("jsonCode")}
        open={open}
        footer={false}
        onCancel={handleClose}
        width={800}
        centered
      >
        <Editor
          height="calc(100vh - 100px)"
          language="json"
          theme={themeMode === "dark" ? "vs-dark" : "vs-light"}
          value={jsonStr}
        />
      </Modal>
    </>
  )
})
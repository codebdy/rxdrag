import { EditOutlined } from "@ant-design/icons"
import Editor from "@monaco-editor/react"
import { Button, Drawer, Space } from "antd"
import { useThemeMode } from "core-react/hooks/useThemeMode"
import { useToolsTranslate } from "core-react/hooks/useToolsTranslate"
import { memo, useCallback, useState } from "react"

export const JSONInput = memo((
  props: {
    title?: string
  }
) => {
  const { title } = props
  const [open, setOpen] = useState(false);
  const themeMode = useThemeMode()

  const t = useToolsTranslate()
  const showDrawer = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);
  return (
    <>
      <Button icon={<EditOutlined />} onClick={showDrawer}>{t('edit')}</Button>
      <Drawer
        title={title}
        placement="right"
        mask={false}
        onClose={handleClose}
        open={open}
        size="large"
        extra={
          <Space>
            <Button onClick={handleClose}>{t("cancel")}</Button>
            <Button type="primary" onClick={handleClose}>
              {t("confirm")}
            </Button>
          </Space>
        }
      >
        <Editor
          height="100%"
          language="json"
          theme={themeMode === "dark" ? "vs-dark" : "vs-light"}
          value={""}
        />
      </Drawer>
    </>
  )
})
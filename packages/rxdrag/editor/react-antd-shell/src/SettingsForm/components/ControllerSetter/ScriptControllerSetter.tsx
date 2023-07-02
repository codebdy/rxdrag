import { IScriptControllerMeta } from "@rxdrag/minions-runtime-react"
import Editor from "@monaco-editor/react";
import { memo, useCallback, useEffect, useState } from "react"
import { useThemeMode, useToolsTranslate } from "@rxdrag/react-core";
import { Button, Drawer, Form, Input, Switch } from "antd";
import { createUuid } from "@rxdrag/shared";

export const ScriptControllerSetter = memo((
  props: {
    value: IScriptControllerMeta,
    onChange?: (value?: IScriptControllerMeta) => void
  }
) => {
  const { value, onChange } = props;
  const [inputValue, setInputValue] = useState("")
  const themeMode = useThemeMode();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setInputValue(value.script || "")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value.id])

  const t = useToolsTranslate()

  const handleGlobalChange = useCallback((checked: boolean) => {
    if (checked) {
      const id = value?.id || createUuid()
      onChange?.({ ...value, id: id, global: true })
    } else {
      if (value) {
        onChange?.({ ...value, global: false })
      }
    }
  }, [onChange, value]);

  const handleNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = e.target;
    if (value) {
      onChange?.({ ...value, name: inputValue })
    }
  }, [onChange, value]);

  const handleChange = useCallback((script?: string) => {
    setInputValue(script || "");
  }, [])

  //缓存一下，解决性能问题
  useEffect(() => {
    if (inputValue !== (value.script || "")) {
      onChange?.({ ...value, script: inputValue })
    }
  }, [inputValue, onChange, value])

  const showModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);


  const handleCancel = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <>
      {
        value?.id &&
        <>
          <Form.Item
            label={t("controllerName")}
          >
            <Input value={value?.name} onChange={handleNameChange} />
          </Form.Item>
          <Form.Item
            label={t("global")}
          >
            <Switch checked={value?.global} onChange={handleGlobalChange} />
          </Form.Item>
        </>
      }
      <Form.Item
        label={t("script")}
      >
        <Button onClick={showModal}>{t("configScript")}</Button>
      </Form.Item>
      <Drawer
        title={t("configScript")}
        placement="right"
        mask={false}
        bodyStyle={{ padding: 0 }}
        onClose={handleCancel}
        open={isModalOpen}
      >
        <Editor
          height="100%"
          language="javascript"
          theme={themeMode === "dark" ? "vs-dark" : "vs-light"}
          value={inputValue || ""}
          options={{ lineNumbers: "off", glyphMargin: false }}
          onChange={handleChange}
        />
      </Drawer>

    </>

  )
})
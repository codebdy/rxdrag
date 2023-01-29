import { Button, Form, Input, Modal, Switch } from "antd"
import { useToolsTranslate } from "core-react/hooks/useToolsTranslate";
import { memo, useCallback, useEffect, useRef, useState } from "react"
import { IControllerMeta, IReactionMeta } from "runner/reaction/interfaces/metas";
import { ReactionsEditor } from "./ReactionsEditor";
import { IEventMeta } from "./ReactionsEditor/interfaces";
import { createUuid } from "./ReactionsEditor/utils";

export const ReactionsInput = memo((props: {
  events?: IEventMeta[]
  title: string,
  value?: IControllerMeta,
  onChange?: (value?: IControllerMeta) => void,
}) => {
  const { events, title, value, onChange, ...other } = props;
  const [inputValue, setInputValue] = useState<IControllerMeta>()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const t = useToolsTranslate()
  const inputValueRef = useRef(inputValue)
  inputValueRef.current = inputValue
  
  useEffect(() => {
    setInputValue(value)
  }, [value])

  useEffect(() => {
    const eventMetas: IReactionMeta[] = [...(inputValueRef.current?.events || [])]
    for (const event of events||[]) {
      if (!inputValueRef.current?.events?.find(evt => evt.name === event.name)) {
        eventMetas.push({
          id: createUuid(),
          name: event.name,
          label: event.label,
        })
      }
    }
    setInputValue({ ...inputValueRef.current, events: eventMetas })
  }, [events])

  const showModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCancel = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleSwitchChange = useCallback((checked: boolean) => {
    if (checked) {
      const id = createUuid()
      onChange?.({ ...value, id: id })
    } else {
      onChange?.({ ...value, id: undefined })
    }
  }, [onChange, value]);

  const handleNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = e.target;
    onChange?.({ ...value, name: inputValue })
  }, [onChange, value]);

  const handleConfigChange = useCallback((meta?: IControllerMeta) => {
    setInputValue({ ...meta, id: value?.id, name: value?.name })
  }, [value?.id, value?.name]);

  const handleOk = useCallback(()=>{
    onChange?.(inputValue)
  }, [inputValue, onChange])

  return (
    <div>
      <Form.Item
        label={title}
      >
        <Switch checked={!!value?.id} onChange={handleSwitchChange} />
      </Form.Item>
      {
        value?.id &&
        <>
          <Form.Item
            label={t("controllerName")}
          >
            <Input value={value.name} onChange={handleNameChange} />
          </Form.Item>
          <Form.Item
            label={t("config")}
          >
            <Button {...other} onClick={showModal}>{t("configController")}</Button>
          </Form.Item>

          <Modal
            title={`${t("configController")} - 对话框`}
            open={isModalOpen}
            cancelText={t("cancel")}
            okText={t("confirm")}
            onCancel={handleCancel}
            onOk = {handleOk}
            width={"calc(100vw - 40px)"}
            style={{
              transform: 'scale(1)',
            }}
            getContainer={false}
            centered
            destroyOnClose
          >
            <ReactionsEditor value={inputValue} onChange={handleConfigChange} />
          </Modal>
        </>
      }

    </div>

  )
})
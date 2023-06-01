import React, { useMemo } from "react"
import { Button, Form, Input, Modal, Switch } from "antd"
import { memo, useCallback, useEffect, useState } from "react"
import { useCurrentNode, useToolsTranslate } from "@rxdrag/react-core"
import { createUuid } from "@rxdrag/shared"
import { useParentControllerMetas } from "./hooks/useParentControllerMetas"
import { ITreeNode } from "@rxdrag/core"
import { IControllerMeta } from "@rxdrag/minions-runtime-react"
import { ControllerMetaEditorAntd5 } from "@rxdrag/controller-editor-antd5"
import { IEventMeta } from "@rxdrag/minions-controller-editor"
import { useGlobalControllerMetas } from "./hooks/useGlobalControllerMetas"
import { activityMaterialCategories } from "./materials"
import { controllerSetterLocales } from "./locales"
import { useFillControllerProps } from "./hooks/useFillControllerProps"
import { INodeSchema } from "@rxdrag/schema"
import { useMinionOptions } from "../../../hooks/useMinionOptions"

export const ControllerSetter = memo((props: {
  events?: IEventMeta[]
  title: string,
  value: IControllerMeta,
  onChange?: (value?: IControllerMeta) => void,
}) => {
  const { events, title, value, onChange, ...other } = props;
  const [inputValue, setInputValue] = useState<IControllerMeta>(value)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const t = useToolsTranslate()
  const node = useCurrentNode() as ITreeNode<INodeSchema, IControllerMeta> | undefined
  const parentControllers = useParentControllerMetas()
  const globalControllers = useGlobalControllerMetas();
  const fillProps = useFillControllerProps();
  const minionOptions = useMinionOptions();

  const mergedControllers = useMemo(() => [
    fillProps(inputValue, node),
    ...parentControllers,
    ...globalControllers.filter(controllerMeta => !parentControllers.find(ctrl => controllerMeta.id === ctrl.id) && inputValue?.id !== controllerMeta.id)
  ],
    [inputValue, parentControllers, globalControllers, fillProps, node])

  useEffect(() => {
    setInputValue(value)
  }, [value])

  const showModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCancel = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleEnableChange = useCallback((checked: boolean) => {
    if (checked) {
      const id = value?.id || createUuid()
      onChange?.({ ...value, id: id, enable: true })
    } else {
      if (value) {
        onChange?.({ ...value, enable: false })
      }
    }
  }, [onChange, value]);

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

  const handleChange = useCallback((meta?: IControllerMeta) => {
    if (value) {
      setInputValue({ ...meta, id: value.id, name: value?.name || node?.title })
    }
  }, [node?.title, value]);

  const handleOk = useCallback(() => {
    onChange?.(inputValue)
    setIsModalOpen(false);
  }, [inputValue, onChange])

  return (
    <div>
      <Form.Item
        label={title}
      >
        <Switch checked={value?.enable} onChange={handleEnableChange} />
      </Form.Item>
      {
        value?.id && value?.enable &&
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
          <Form.Item
            label={t("global")}
          >
            <Switch checked={value?.global} onChange={handleGlobalChange} />
          </Form.Item>
          <Modal
            title={`${t("configController")} - ${inputValue?.name || node?.title}`}
            open={isModalOpen}
            cancelText={t("cancel")}
            okText={t("confirm")}
            onCancel={handleCancel}
            onOk={handleOk}
            width={"calc(100vw - 40px)"}
            style={{
              transform: 'scale(1)',
            }}
            getContainer={false}
            centered
            destroyOnClose
          >
            {
              inputValue &&
              <ControllerMetaEditorAntd5
                value={inputValue}
                onChange={handleChange}
                controllerMetas={mergedControllers}
                materialCategories={minionOptions?.minionMaterials || activityMaterialCategories}
                locales={minionOptions?.minionLocales || controllerSetterLocales}
                eventMetas={events}
              />
            }
          </Modal>
        </>
      }

    </div>

  )
})
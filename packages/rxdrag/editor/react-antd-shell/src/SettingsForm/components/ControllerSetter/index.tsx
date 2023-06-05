import React, { useMemo } from "react"
import { Button, Form, Input, Modal, Radio, Switch } from "antd"
import { memo, useCallback, useEffect, useState } from "react"
import { useCurrentNode, useDesignerEngine, useToolsTranslate } from "@rxdrag/react-core"
import { createUuid } from "@rxdrag/shared"
import { useParentControllerMetas } from "./hooks/useParentControllerMetas"
import { ITreeNode } from "@rxdrag/core"
import { ILogicFlowControllerMeta } from "@rxdrag/minions-runtime-react"
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
  value: ILogicFlowControllerMeta,
  onChange?: (value?: ILogicFlowControllerMeta) => void,
}) => {
  const { events, title, value, onChange, ...other } = props;
  const [inputValue, setInputValue] = useState<ILogicFlowControllerMeta>(value)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const t = useToolsTranslate()
  const node = useCurrentNode() as ITreeNode<INodeSchema, ILogicFlowControllerMeta> | undefined
  const parentControllers = useParentControllerMetas()
  const globalControllers = useGlobalControllerMetas();
  const fillProps = useFillControllerProps();
  const minionOptions = useMinionOptions();
  const eng = useDesignerEngine();
  useEffect(() => {
    const langMgr = eng?.getLoacalesManager()
    for (const ctrlDef of minionOptions?.controllers || []) {
      ctrlDef.locales && langMgr?.registerToolsLocales(ctrlDef.locales)
    }
  }, [eng, minionOptions?.controllers])

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

  const handleChange = useCallback((meta?: ILogicFlowControllerMeta) => {
    if (value) {
      setInputValue({ ...meta, id: value.id, name: value?.name || node?.title })
    }
  }, [node?.title, value]);

  const handleOk = useCallback(() => {
    onChange?.(inputValue)
    setIsModalOpen(false);
  }, [inputValue, onChange])

  const trimLabel = useCallback((label?: string) => {
    if (label?.startsWith("$")) {
      return label.substring(1)
    }
    return label;
  }, [])

  const handleControllerTypeChange = useCallback((type: string) => {
    if (value?.controllerType === type) {
      onChange?.({ id: value?.id, enable: false, })
    } else {
      onChange?.({ id: value?.id || createUuid(), enable: true, controllerType: type })
    }
  }, [onChange, value?.controllerType, value?.id])

  return (
    <div>
      <Form.Item
        label={title}
      >
        <Radio.Group
          value={value?.controllerType}
        >
          {
            minionOptions?.controllers?.map(ctrlDef => {
              return (
                <Radio.Button
                  key={ctrlDef.name}
                  value={ctrlDef.name}
                  onClick={() => handleControllerTypeChange(ctrlDef.name)}
                >
                  {t(trimLabel(ctrlDef.label) || "") || ctrlDef.name}
                </Radio.Button>
              )
            })
          }
        </Radio.Group>
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
                materialCategories={minionOptions?.materials || activityMaterialCategories}
                locales={minionOptions?.locales || controllerSetterLocales}
                setters={minionOptions?.propSetters}
                eventMetas={events}
              />
            }
          </Modal>
        </>
      }

    </div>

  )
})
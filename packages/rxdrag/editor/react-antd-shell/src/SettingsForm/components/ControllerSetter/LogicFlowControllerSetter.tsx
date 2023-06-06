import { ILogicFlowControllerMeta } from "@rxdrag/minions-runtime-react"
import { INodeSchema } from "@rxdrag/schema";
import { Form, Button, Modal, Input, Switch } from "antd";
import { memo, useCallback, useEffect, useMemo, useState } from "react"
import { useParentControllerMetas } from "./hooks/useParentControllerMetas";
import { ControllerMetaEditorAntd5 } from "@rxdrag/controller-editor-antd5";
import { ITreeNode } from "@rxdrag/core";
import { useCurrentNode, useToolsTranslate } from "@rxdrag/react-core";
import { useGlobalControllerMetas } from "./hooks/useGlobalControllerMetas";
import { controllerSetterLocales } from "./locales";
import { activityMaterialCategories } from "./materials";
import { IEventMeta } from "@rxdrag/minions-controller-editor";
import { useMinionOptions } from "../../../hooks/useMinionOptions";
import { createUuid } from "@rxdrag/shared";

export const LogicFlowControllerSetter = memo((
  props: {
    value: ILogicFlowControllerMeta,
    onChange?: (value?: ILogicFlowControllerMeta) => void,
    events?: IEventMeta[]
  }
) => {
  const { value, onChange, events } = props;
  const [inputValue, setInputValue] = useState<ILogicFlowControllerMeta | undefined>(value)
  const [isModalOpen, setIsModalOpen] = useState(false);

  const t = useToolsTranslate()

  useEffect(() => {
    setInputValue(value)
  }, [value])

  const node = useCurrentNode() as ITreeNode<INodeSchema, ILogicFlowControllerMeta> | undefined
  const parentControllers = useParentControllerMetas()
  const globalControllers = useGlobalControllerMetas();
  //const fillProps = useFillControllerProps();
  const minionOptions = useMinionOptions();

  const mergedControllers = useMemo(() => [
    //fillProps(inputValue, node),
    ...parentControllers,
    ...globalControllers.filter(controllerMeta => !parentControllers.find(ctrl => controllerMeta.id === ctrl.id) && inputValue?.id !== controllerMeta.id)
  ],
    [inputValue, parentControllers, globalControllers])

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

  const showModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCancel = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleChange = useCallback((meta?: ILogicFlowControllerMeta) => {
    if (value) {
      setInputValue({ ...meta, id: value.id, name: value?.name || node?.title })
    }
  }, [node?.title, value]);

  const handleOk = useCallback(() => {
    onChange?.(inputValue)
    setIsModalOpen(false);
  }, [inputValue, onChange])

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
        label={t("config")}
      >
        <Button onClick={showModal}>{t("configController")}</Button>
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
  )
})
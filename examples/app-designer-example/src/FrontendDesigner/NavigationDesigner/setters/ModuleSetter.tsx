import { Form, Input } from "antd"
import { memo, useCallback } from "react"
import { useTranslate } from "@rxdrag/react-locales";
import { ConfigForm, ConfigSetterProps } from "@rxdrag/react-menu-designer";
import { IModuleItemConfig } from "../types";
import { ModuleSelect } from "./ModuleSelect";
import { useAppFrontend } from "../../../hooks/useAppFrontend";
import { ID } from "@rxdrag/shared";
import { IconInput } from "@rxdrag/react-antd-props-inputs";

export const ModuleSetter = memo((
  props: ConfigSetterProps<IModuleItemConfig>
) => {
  const { value, onChange } = props;
  const appFront = useAppFrontend()
  const t = useTranslate()

  const getModule = useCallback((id: ID) => {
    for (const moduleCat of appFront?.moduleCategories || []) {
      for (const module of moduleCat.modules || []) {
        if (module.id === id) {
          return module
        }
      }
    }
  }, [appFront?.moduleCategories])

  const handleChange = useCallback((config: IModuleItemConfig) => {
    const newValue = { ...value, ...config }
    if (value?.moduleId !== config.moduleId) {
      const newModule = getModule(config.moduleId)
      if (newModule) {
        newValue.title = newModule.title
      }
    }
    onChange?.(newValue)
  }, [getModule, onChange, value])

  return (
    <ConfigForm
      value={value}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onChange={handleChange as any}
    >
      <Form.Item label={t("title")} name="title">
        <Input />
      </Form.Item>
      <Form.Item label={t("icon")} name="icon">
        <IconInput />
      </Form.Item>
      <Form.Item label={t("module")} name="moduleId">
        <ModuleSelect />
      </Form.Item>
    </ConfigForm>
  )
})
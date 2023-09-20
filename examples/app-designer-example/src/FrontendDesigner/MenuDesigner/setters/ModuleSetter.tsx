import { Form, Input } from "antd"
import { memo } from "react"
import { useTranslate } from "@rxdrag/react-locales";
import { ConfigForm, ConfigSetterProps } from "@rxdrag/react-menu-designer";
import { IModuleItemConfig } from "../types";
import { ModuleSelect } from "./ModuleSelect";

export const ModuleSetter = memo((
  props: ConfigSetterProps<IModuleItemConfig>
) => {
  const { value, onChange } = props;

  const t = useTranslate()

  return (
    <ConfigForm
      value={value}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onChange={onChange as any}
    >
      <Form.Item label={t("title")} name="title">
        <Input />
      </Form.Item>
      <Form.Item label={t("module")} name="moduleId">
        <ModuleSelect />
      </Form.Item>
    </ConfigForm>
  )
})
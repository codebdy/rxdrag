import { Form, Input, Radio } from "antd";
import { memo } from "react"
import { ArgsInput } from "./ArgsInput";
import { MethodTypeInput } from "./MethodTypeInput";
import { ExtensionType, IExtension } from "../../../interfaces/extension";
import { useTranslate } from "@rxdrag/react-locales";

export const MethodFormCommonItems = memo((
  props: {
    nameError?: string,
    method: IExtension,
  }
) => {
  const { nameError, method } = props;
  const t = useTranslate();

  return (
    <>
      <Form.Item
        label={t("UmlEditor.Name")}
        name="name"
        validateStatus={nameError ? "error" : undefined}
        help={nameError}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={t("UmlEditor.OperateType")}
        name="operateType"
      >
        <Radio.Group
          optionType="button"
          disabled={method.operateType === ExtensionType.SubMethod}
          options={[
            {
              value: ExtensionType.Query,
              label: t("UmlEditor.Query"),
            },
            {
              value: ExtensionType.Mutation,
              label: t("UmlEditor.Mutation"),
            },

          ]}
        />
      </Form.Item>
      {
        method.operateType !== ExtensionType.SubMethod &&
        <>
          <MethodTypeInput method={method} />
          <Form.Item
            label={t("UmlEditor.Arguments")}
            name="args"
          >
            <ArgsInput />
          </Form.Item>
        </>
      }
      <Form.Item
        label={t("Description")}
        name="description"
      >
        <Input.TextArea />
      </Form.Item>
    </>
  )
})
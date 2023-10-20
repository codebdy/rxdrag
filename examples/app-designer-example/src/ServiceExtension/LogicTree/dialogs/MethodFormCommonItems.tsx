import { Form, Input, Radio } from "antd";
import { memo } from "react"
import { ArgsInput } from "./ArgsInput";
import { MethodTypeInput } from "./MethodTypeInput";
import { OperateType, IExtension } from "../../../interfaces/extension";
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
        label={t("Name")}
        name="name"
        validateStatus={nameError ? "error" : undefined}
        rules={[{ required: true, message: t("Required") }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={t("OperateType")}
        name="operateType"
      >
        <Radio.Group
          optionType="button"
          disabled={method.operateType === OperateType.SubMethod}
          options={[
            {
              value: OperateType.Query,
              label: t("Query"),
            },
            {
              value: OperateType.Mutation,
              label: t("Mutation"),
            },

          ]}
        />
      </Form.Item>
      {
        method.operateType !== OperateType.SubMethod &&
        <>
          <MethodTypeInput method={method} />
          <Form.Item
            label={t("Arguments")}
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
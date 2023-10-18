import { Form, Input, Radio } from "antd";
import React from "react";
import { memo } from "react"
import { useTranslation } from "react-i18next";
import { MultiLangInput } from "components/MultiLangInput";
import { ArgsInput } from "./ArgsInput";
import { MethodTypeInput } from "./MethodTypeInput";
import { MethodMeta, MethodOperateType } from "UmlEditor/meta/MethodMeta";

export const MethodFormCommonItems = memo((
  props: {
    nameError?: string,
    method: MethodMeta,
    hasSub?: boolean,
  }
) => {
  const { nameError, method, hasSub } = props;
  const { t } = useTranslation();

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
          disabled={method.operateType === MethodOperateType.SubMethod}
          options={[
            {
              value: MethodOperateType.Query,
              label: t("UmlEditor.Query"),
            },
            {
              value: MethodOperateType.Mutation,
              label: t("UmlEditor.Mutation"),
            },
            ...(hasSub ? [{
              value: MethodOperateType.SubMethod,
              label: t("UmlEditor.SubMethod"),
            }] : [])

          ]}
        />
      </Form.Item>
      {
        method.operateType !== MethodOperateType.SubMethod &&
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
        <MultiLangInput multiline inline title={t("Description")} />
      </Form.Item>
    </>
  )
})
import type { FormInstance } from "antd";
import { Button, Form, Input, InputNumber, Space, Tooltip } from "antd"
import { memo, useCallback, useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { QuestionCircleOutlined } from "@ant-design/icons";
import { handleBlockClick } from "./utils";
import { useTranslate } from "@rxdrag/react-locales";

const StyleQuestion = styled(QuestionCircleOutlined)`
  font-size: 10px;
`

const StyleForm = styled(Form)`
  width: 320px;
  padding: 24px;
  padding-top: 0;
`

const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

export type CallbackFn = () => void

export const EditForm = memo((
  props: {
    onCancel: () => void,
    onSaved: (finished?: CallbackFn) => void,
    value?: any,
    parent?: any,
    idKey: string,
    labelKey: string,
  }
) => {
  const { onCancel, onSaved, value, parent, idKey, labelKey } = props
  const [saving, setSaving] = useState<boolean>()
  const t = useTranslate("TreeList");
  const formRef = useRef<FormInstance>(null);

  // const [update, { saving: updateLoading }] = useSave(
  //   {
  //     api: entityConfig.curdApi.update,
  //     entity: entityConfig.entity
  //   },
  //   {
  //     onComplete: () => {
  //       onSaved()
  //       formRef.current?.resetFields()
  //     }
  //   }
  // )

  useEffect(() => {
    formRef.current?.setFieldsValue(value)
  }, [value])

  const handleCancel = useCallback(() => {
    formRef.current?.resetFields()
    onCancel()
  }, [onCancel])

  const handleFinish = useCallback((val: unknown) => {
    const newVal = {
      ...value || {},
      ...(val as any),
      // moduleType: crudConfig.moduleType,
      // parentId: parent ? parent[treeFieldNames?.key || ""] : 0,
      level: parent ? 2 : 1,
    }
    //新增

  }, [parent, value])

  return (
    <StyleForm
      labelCol={{ span: 7 }}
      colon={false}
      labelAlign="left"
      ref={formRef}
      onFinish={handleFinish}
      initialValues={value || { sort: 100 }}
      onClick={handleBlockClick}
    >
      <Form.Item label={t("parent")}>
        {parent?.[labelKey] || t("none")}
      </Form.Item>
      <Form.Item
        name={labelKey}
        label={t("name")}
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="sort"
        label={
          <>
            <span style={{ marginRight: 4 }}>顺序</span>
            <Tooltip title="顺序值越小，越靠前">
              <StyleQuestion />
            </Tooltip>
          </>
        }
        rules={[{ required: true }]}
      >
        <InputNumber style={{ width: '100%' }} />
      </Form.Item>
      <Actions>
        <Space>
          <Button onClick={handleCancel}>{t("cancel")}</Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={saving}
          >{t("confirm")}</Button>
        </Space>
      </Actions>
    </StyleForm>
  )
})
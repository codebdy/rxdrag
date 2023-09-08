import type { FormInstance } from "antd";
import { Button, Form, Input, InputNumber, Space, Tooltip } from "antd"
import { memo, useCallback, useEffect, useRef } from "react"
import type { FieldNames } from ".";
import { defaultFieldNames } from "."
import { QuestionCircleOutlined } from "@ant-design/icons";
import { handleBlockClick } from "./utils";
import styled from "styled-components";

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

export const EditForm = memo((
  props: {
    treeFieldNames?: FieldNames,
    onCancel: () => void,
    onSaved: () => void,
    value?: unknown,
    entityConfig: IEntityConfig,
    parent?: unknown
  }
) => {
  const { treeFieldNames = defaultFieldNames, onCancel, onSaved, value, entityConfig, parent } = props
  const intl = useIntl();
  const formRef = useRef<FormInstance>(null);
  const [save, { saving }] = useSave(
    {
      api: entityConfig.curdApi.save,
      entity: entityConfig.entity
    },
    {
      onComplete: () => {
        onSaved()
      }
    }
  )

  const [update, { saving: updateLoading }] = useSave(
    {
      api: entityConfig.curdApi.update,
      entity: entityConfig.entity
    },
    {
      onComplete: () => {
        onSaved()
        formRef.current?.resetFields()
      }
    }
  )

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
      moduleType: crudConfig.moduleType,
      parentId: parent ? parent[treeFieldNames?.key || ""] : 0,
      level: parent ? 2 : 1,
    }
    //新增
    if (!value?.[treeFieldNames?.key || ""]) {
      save(newVal)
    } else {//编辑
      update(newVal)
    }
  }, [parent, save, treeFieldNames?.key, update, value])

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
      <Form.Item label="上级">
        {parent?.[treeFieldNames.name || ""] || "无"}
      </Form.Item>
      <Form.Item
        name={treeFieldNames.name}
        label="名称"
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
          <Button onClick={handleCancel}>{intl.formatMessage({ id: 'crud.cancel' })}</Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={saving || updateLoading}
          >{intl.formatMessage({ id: 'crud.ok' })}</Button>
        </Space>
      </Actions>
    </StyleForm>
  )
})
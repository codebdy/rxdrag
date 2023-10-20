import { FormInstance, Form, Select, Input } from "antd";
import React, { useCallback } from "react";
import { memo } from "react";
import { IProcess, IProcessCategory, IProcessInput } from "../../interfaces/process";
import { useTranslate } from "@rxdrag/react-locales";
const { Option } = Select;

const ProcessForm = memo((props: {
  categoryId?: string,
  process?: IProcess,
  categories: IProcessCategory[],
  form: FormInstance<IProcessInput>
}) => {
  const { categoryId, process, categories, form } = props;
  const t = useTranslate();

  const handleKeyUp = useCallback((event: React.KeyboardEvent<HTMLElement>) => {
    event.stopPropagation();
  }, [])

  return (
    <Form
      labelCol={{ span: 5 }}
      wrapperCol={{ span: 16 }}
      form={form}
      initialValues={{ name: process?.name || "", categoryId: process?.categoryId || categoryId || "" }}
      autoComplete="off"
      onKeyUp={handleKeyUp}
    >
      <Form.Item
        label={t("Name")}
        name="name"
        rules={[{ required: true, message: t("Required") }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={t("SelectCategory")}
        name="categoryId"
      >
        <Select>
          <Option value=""><em>None</em></Option>
          {
            categories.map((category) => {
              return (
                <Option key={category.id} value={category.id}>
                  {category.name}
                </Option>
              )
            })
          }
        </Select>
      </Form.Item>
    </Form>
  )
})

export default ProcessForm;
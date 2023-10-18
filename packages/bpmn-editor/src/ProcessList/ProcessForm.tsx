import { FormInstance, Form, Select } from "antd";
import React, { useCallback } from "react";
import { memo } from "react";
import { IPageInput, IProcess, IProcessCategory } from "model";
import { useTranslation } from "react-i18next";
import { MultiLangInput } from "components/MultiLangInput";
import { useParseLangMessage } from "plugin-sdk/hooks/useParseLangMessage";
const { Option } = Select;

const ProcessForm = memo((props: {
  categoryUuid?: string,
  process?: IProcess,
  categories: IProcessCategory[],
  form: FormInstance<IPageInput>
}) => {
  const { categoryUuid, process, categories, form } = props;
  const { t } = useTranslation();
  const p = useParseLangMessage();

  const handleKeyUp = useCallback((event: React.KeyboardEvent<HTMLElement>) => {
    event.stopPropagation();
  }, [])

  return (
    <Form
      name="editPage"
      labelCol={{ span: 5 }}
      wrapperCol={{ span: 16 }}
      form={form}
      initialValues={{ name: process?.name || "", categoryUuid: process?.categoryUuid || categoryUuid || "" }}
      autoComplete="off"
      onKeyUp={handleKeyUp}
    >
      <Form.Item
        label={t("Name")}
        name="name"
        rules={[{ required: true, message: t("Required") }]}
      >
        <MultiLangInput title={t("Name")} />
      </Form.Item>

      <Form.Item
        label={t("AppBpmn.SelectCategory")}
        name="categoryUuid"
      >
        <Select>
          <Option value=""><em>None</em></Option>
          {
            categories.map((category) => {
              return (
                <Option key={category.uuid} value={category.uuid}>
                  {p(category.name)}
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
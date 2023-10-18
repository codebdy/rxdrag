import { useCallback, useEffect } from "react";
import { Form, Input } from "antd";
import { useTranslation } from "react-i18next";
import { useMetaId } from "../hooks/useMetaId";
import { PannelContainer } from "./PannelContainer";
import { CodeMeta } from "UmlEditor/meta/CodeMeta";
import { useChangeCode } from "UmlEditor/hooks/useChangeCode";

export const CodePanel = (props: { code: CodeMeta }) => {
  const { code } = props;
  const metaId = useMetaId();
  const changeCode = useChangeCode(metaId);
  const { t } = useTranslation();
  const [form] = Form.useForm()

  useEffect(() => {
    form.resetFields();
  }, [form, code.uuid])

  useEffect(
    () => {
      form.setFieldsValue({ ...code });
    },
    [code, form]
  )
  const handleChange = useCallback((formData: any) => {
    changeCode({ ...code, ...formData });

  }, [changeCode, code])

  return (
    <PannelContainer className="property-pannel">
      <Form
        name="classForm"
        form={form}
        colon={false}
        labelAlign="left"
        labelCol={{ span: 9 }}
        wrapperCol={{ span: 15 }}
        initialValues={code}
        autoComplete="off"
        onValuesChange={handleChange}
      >
        <Form.Item
          label={t("UmlEditor.Name")}
          name="name"
        >
          <Input />
        </Form.Item>
      </Form>
    </PannelContainer>
  );
};

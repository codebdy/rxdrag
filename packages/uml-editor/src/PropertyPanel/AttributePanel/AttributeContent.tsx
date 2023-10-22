import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useChangeAttribute } from "../../hooks/useChangeAttribute";
import { useGetTypeLabel } from "../../hooks/useGetTypeLabel";
import { Form, Input, Switch } from "antd";
import { AttributeTypeInput } from "../AttributeTypeInput";
import { useMetaId } from "../../hooks/useMetaId";
import { useTranslate } from "@rxdrag/react-locales";
import { isStr } from "@rxdrag/shared";
import { AttributeMeta, ClassMeta, CONST_ID, StereoType, Types } from "@rxdrag/uml-schema";
import { Container } from "./Container";

export const AttributeContent = (props: {
  attribute: AttributeMeta;
  cls: ClassMeta;
}) => {
  const { attribute, cls } = props;
  const [nameError, setNameError] = useState<string>();
  const metaId = useMetaId();
  const changeAttribute = useChangeAttribute(metaId);
  const getTypeLabel = useGetTypeLabel(metaId);
  const t = useTranslate();
  const [form] = Form.useForm()

  useEffect(() => {
    form.resetFields();
  }, [form, attribute.uuid])

  useEffect(() => {
    form.setFieldsValue({ ...attribute });
  }, [attribute, form])

  const isId = useMemo(() => attribute.name === CONST_ID, [attribute.name]);

  const handleChange = useCallback((form: AttributeMeta) => {
    if (form?.length && isStr(form?.length)) {
      form.length = parseInt(form.length)
    }

    const errMsg = changeAttribute(
      {
        ...attribute,
        ...form,
        typeLabel: getTypeLabel(form.type || attribute.type, form.typeUuid),
      },
      cls
    );
    setNameError(errMsg)
  }, [changeAttribute, attribute, getTypeLabel, cls])


  return (
    <Container className="property-pannel">
      <Form
        name="attributeForm"
        form={form}
        colon={false}
        labelAlign="left"
        labelCol={{ span: 9 }}
        wrapperCol={{ span: 15 }}
        initialValues={attribute}
        autoComplete="off"
        onValuesChange={handleChange}
      >
        <Form.Item
          label={t("Name")}
          name="name"
          validateStatus={nameError ? "error" : undefined}
          help={nameError}
        >
          <Input disabled={isId} />
        </Form.Item>

        {!isId &&
          <Form.Item
            label={t("Label")}
            name="label"
          >
            <Input />
          </Form.Item>
        }

        {cls.stereoType !== StereoType.Enum && (
          <>
            <AttributeTypeInput attribute={attribute} />
            {
              !isId &&
              <>
                <Form.Item
                  label={t("Nullable")}
                  valuePropName="checked"
                  name="nullable"
                >
                  <Switch />
                </Form.Item>
                <Form.Item
                  label={t("Unique")}
                  valuePropName="checked"
                  name="unique"
                >
                  <Switch />
                </Form.Item>
                <Form.Item
                  label={t("Index")}
                  valuePropName="checked"
                  name="index"
                >
                  <Switch />
                </Form.Item>
                <Form.Item
                  label={t("HiddenField")}
                  valuePropName="checked"
                  name="hidden"
                >
                  <Switch />
                </Form.Item>
              </>
            }
            {
              attribute.type === Types.Uuid &&
              <Form.Item
                label={t("AutoGenerate")}
                valuePropName="checked"
                name="autoGenerate"
              >
                <Switch />
              </Form.Item>
            }
            {
              attribute.type === Types.Int &&
              <Form.Item
                label={t("AutoIncrement")}
                valuePropName="checked"
                name="autoIncrement"
              >
                <Switch />
              </Form.Item>
            }
            {
              attribute.type === Types.Date &&
              <>
                <Form.Item
                  label={t("CreateDate")}
                  valuePropName="checked"
                  name="createDate"
                >
                  <Switch />
                </Form.Item>
                <Form.Item
                  label={t("UpdateDate")}
                  valuePropName="checked"
                  name="updateDate"
                >
                  <Switch />
                </Form.Item>
                <Form.Item
                  label={t("DeleteDate")}
                  valuePropName="checked"
                  name="deleteDate"
                >
                  <Switch />
                </Form.Item>
              </>
            }
            {
              !isId &&
              <>
                <Form.Item
                  label={t("DefaultValue")}
                  name="default"
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label={t("Length")}
                  name="length"
                >
                  <Input type={"number"} />
                </Form.Item>
              </>
            }

          </>
        )}
        <Form.Item
          label={t("Description")}
          name="description"
        >
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Container>
  );
};

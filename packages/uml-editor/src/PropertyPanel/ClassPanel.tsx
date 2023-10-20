import React, { useCallback, useEffect, useState } from "react";
import { useChangeClass } from "../hooks/useChangeClass";
import { Form, Input, Select, Switch } from "antd";
import { packagesState } from "../recoil/atoms";
import { useRecoilValue } from "recoil";
import { PannelContainer } from "./PannelContainer";
import { ClassMeta, StereoType } from "@rxdrag/uml-schema";
import { useMetaId } from "../hooks/useMetaId";
import { useTranslate } from "@rxdrag/react-locales";
const { Option } = Select;

export const ClassPanel = (props: { cls: ClassMeta }) => {
  const { cls } = props;
  const [nameError, setNameError] = useState<string>();
  const metaId = useMetaId();
  const changeClass = useChangeClass(metaId);
  const packages = useRecoilValue(packagesState(metaId));
  const t = useTranslate();
  const [form] = Form.useForm()

  useEffect(() => {
    form.resetFields();
  }, [form, cls.uuid])

  useEffect(
    () => {
      form.setFieldsValue({ ...cls });
    },
    [cls, form]
  )
  const handleChange = useCallback((formData: ClassMeta) => {
    const errMsg = changeClass({ ...cls, ...formData });
    setNameError(errMsg)
  }, [changeClass, cls])

  return (
    <PannelContainer className="property-pannel">
      <Form
        name="classForm"
        form={form}
        colon={false}
        labelAlign="left"
        labelCol={{ span: 9 }}
        wrapperCol={{ span: 15 }}
        initialValues={cls}
        autoComplete="off"
        onValuesChange={handleChange}
      >
        <Form.Item
          label={t("Name")}
          name="name"
          validateStatus={nameError ? "error" : undefined}
          help={nameError}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={t("Label")}
          name="label"
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={t("Package")}
          name="packageUuid"
        >
          <Select >
            {
              packages?.map(pkg => {
                return (
                  <Option key={pkg.uuid} value={pkg.uuid}>{pkg.name}</Option>
                )
              })
            }
          </Select>
        </Form.Item>
        {cls.stereoType !== StereoType.Enum &&
          cls.stereoType !== StereoType.ValueObject &&
          (
            <Form.Item
              name="root"
              valuePropName="checked"
              label={t("RootNode")}
            >
              <Switch disabled={cls.stereoType === StereoType.Service} />
            </Form.Item>
          )
        }
        <Form.Item
          label={t("Description")}
          name="description"
        >
          <Input.TextArea />
        </Form.Item>
        {
          cls.stereoType === StereoType.Entity &&
          <>
            <Form.Item
              label={t("InnerId")}
              name="innerId"
            >
              <Input disabled />
            </Form.Item>
          </>
        }
      </Form>
    </PannelContainer>
  );
};

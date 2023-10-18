import React, { memo, useCallback, useEffect, useState } from "react";
import { MethodMeta } from "../../meta/MethodMeta";
import { useGetTypeLabel } from "../../hooks/useGetTypeLabel";
import { Form } from "antd";
import { useMetaId } from "../../hooks/useMetaId";
import { MethodFormCommonItems } from "./MethodFormCommonItems";
import { useChangeApi } from "UmlEditor/hooks/useChangeApi";

export const ApiPanel = memo((props: { api: MethodMeta; }) => {
  const { api } = props;
  const [nameError, setNameError] = useState<string>();
  const metaId = useMetaId();
  const changeApi = useChangeApi(metaId);
  const getTypeLabel = useGetTypeLabel(metaId);
  const [form] = Form.useForm();

  useEffect(
    () => {
      form.setFieldsValue({ ...api });
    },
    [api, form]
  )

  const handleChange = useCallback((form: any) => {
    const errMsg = changeApi(
      {
        ...api,
        ...form,
        typeLabel: getTypeLabel(form.type || api.type, form.typeUuid),
      }
    );
    setNameError(errMsg)
  }, [changeApi, api, getTypeLabel])

  return (
    <div className="property-pannel">
      <Form
        name="attributeForm"
        form={form}
        colon={false}
        labelAlign="left"
        labelCol={{ span: 9 }}
        wrapperCol={{ span: 15 }}
        initialValues={api}
        autoComplete="off"
        onValuesChange={handleChange}
      >
        <MethodFormCommonItems nameError={nameError} method={api} />
      </Form>
    </div>
  );
});

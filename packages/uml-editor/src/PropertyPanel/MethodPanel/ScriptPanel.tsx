import React, { memo, useCallback, useEffect, useState } from "react";
import { MethodMeta } from "../../meta/MethodMeta";
import { useGetTypeLabel } from "../../hooks/useGetTypeLabel";
import { Form } from "antd";
import { useMetaId } from "../../hooks/useMetaId";
import { MethodFormCommonItems } from "./MethodFormCommonItems";
import { useChangeScriptLogic } from "UmlEditor/hooks/useChangeScriptLogic";

export const ScriptPanel = memo((props: { scriptLogic: MethodMeta; }) => {
  const { scriptLogic } = props;
  const [nameError, setNameError] = useState<string>();
  const metaId = useMetaId();
  const changeScript = useChangeScriptLogic(metaId);
  const getTypeLabel = useGetTypeLabel(metaId);
  const [form] = Form.useForm();

  useEffect(
    () => {
      form.setFieldsValue({ ...scriptLogic });
    },
    [scriptLogic, form]
  )

  const handleChange = useCallback((form: any) => {
    const errMsg = changeScript(
      {
        ...scriptLogic,
        ...form,
        typeLabel: getTypeLabel(form.type || scriptLogic.type, form.typeUuid),
      }
    );
    setNameError(errMsg)
  }, [changeScript, scriptLogic, getTypeLabel])

  return (
    <div className="property-pannel">
      <Form
        name="attributeForm"
        form={form}
        colon={false}
        labelAlign="left"
        labelCol={{ span: 9 }}
        wrapperCol={{ span: 15 }}
        initialValues={scriptLogic}
        autoComplete="off"
        onValuesChange={handleChange}
      >
        <MethodFormCommonItems nameError={nameError} method={scriptLogic} />
      </Form>
    </div>
  );
});

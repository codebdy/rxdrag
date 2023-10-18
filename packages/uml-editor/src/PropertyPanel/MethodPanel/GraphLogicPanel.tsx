import React, { memo, useCallback, useEffect, useState } from "react";
import { MethodMeta } from "../../meta/MethodMeta";
import { useGetTypeLabel } from "../../hooks/useGetTypeLabel";
import { Form } from "antd";
import { useMetaId } from "../../hooks/useMetaId";
import { MethodFormCommonItems } from "./MethodFormCommonItems";
import { useChangeGraphLogic } from "UmlEditor/hooks/useChangeGraphLogic";

export const GraphLogicPanel = memo((props: { graphLogic: MethodMeta; }) => {
  const { graphLogic } = props;
  const [nameError, setNameError] = useState<string>();
  const metaId = useMetaId();
  const changeGraphLogic = useChangeGraphLogic(metaId);
  const getTypeLabel = useGetTypeLabel(metaId);
  const [form] = Form.useForm();

  useEffect(
    () => {
      form.setFieldsValue({ ...graphLogic });
    },
    [graphLogic, form]
  )

  const handleChange = useCallback((form: any) => {
    const errMsg = changeGraphLogic(
      {
        ...graphLogic,
        ...form,
        typeLabel: getTypeLabel(form.type || graphLogic.type, form.typeUuid),
      }
    );
    setNameError(errMsg)
  }, [changeGraphLogic, graphLogic, getTypeLabel])

  return (
    <div className="property-pannel">
      <Form
        name="attributeForm"
        form={form}
        colon={false}
        labelAlign="left"
        labelCol={{ span: 9 }}
        wrapperCol={{ span: 15 }}
        initialValues={graphLogic}
        autoComplete="off"
        onValuesChange={handleChange}
      >
        <MethodFormCommonItems nameError={nameError} method={graphLogic} hasSub />
      </Form>
    </div>
  );
});

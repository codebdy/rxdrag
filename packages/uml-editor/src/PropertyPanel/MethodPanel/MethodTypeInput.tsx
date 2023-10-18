import React from "react";
import { Form } from "antd";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { MethodMeta } from "../../meta/MethodMeta";
import { TypeSelect } from "../TypeSelect";
import { TypeUuidSelect } from "../TypeUuidSelect";

export const MethodTypeInput = memo(
  (
    props: {
      method: MethodMeta
    }
  ) => {
    const { method } = props;
    const { t } = useTranslation();

    return (
      <>
        <Form.Item
          label={t("UmlEditor.ReturnType")}
          name="type"
        >
          <TypeSelect></TypeSelect>
        </Form.Item>
        <TypeUuidSelect type={method.type} withFormItem />
      </>
    );
  }
);

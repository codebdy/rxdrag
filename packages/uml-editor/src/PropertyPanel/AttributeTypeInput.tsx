import React, { useMemo } from "react";
import { Form } from "antd";
import { memo } from "react";
import { TypeSelect } from "./TypeSelect";
import { TypeIdSelect } from "./TypeIdSelect";
import { AttributeMeta, CONST_ID } from "@rxdrag/uml-schema";
import { useTranslate } from "@rxdrag/react-locales";

export const AttributeTypeInput = memo(
  (
    props: {
      attribute: AttributeMeta
    }
  ) => {
    const { attribute } = props;
    const  t  = useTranslate();
    const isId = useMemo(() => attribute.name === CONST_ID, [attribute.name]);

    return (
      <>
        <Form.Item
          label={t("Type")}
          name="type"
        >
          <TypeSelect disabled={isId}></TypeSelect>
        </Form.Item>
        <TypeIdSelect type={attribute.type} withFormItem />
      </>
    );
  }
);

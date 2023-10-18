import React, { useMemo } from "react";
import { Form } from "antd";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { AttributeMeta } from "../meta/AttributeMeta";
import { CONST_ID } from "../meta/Meta";
import { TypeSelect } from "./TypeSelect";
import { TypeUuidSelect } from "./TypeUuidSelect";

export const AttributeTypeInput = memo(
  (
    props: {
      attribute: AttributeMeta
    }
  ) => {
    const { attribute } = props;
    const { t } = useTranslation();
    const isId = useMemo(() => attribute.name === CONST_ID, [attribute.name]);

    return (
      <>
        <Form.Item
          label={t("Type")}
          name="type"
        >
          <TypeSelect disabled={isId}></TypeSelect>
        </Form.Item>
        <TypeUuidSelect type={attribute.type} withFormItem />
      </>
    );
  }
);

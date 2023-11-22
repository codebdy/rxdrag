import React from "react"
import { memo } from "react"
import { Button } from "antd"
import { PlusOutlined } from "@ant-design/icons";
import { useCreateClassAttribute } from "../hooks/useCreateClassAttribute";
import { useMetaId } from "../hooks/useMetaId";
import { useTranslate } from "@rxdrag/react-locales";
import { ClassMeta } from "@rxdrag/uml-schema";
import TreeNodeLabel from "./TreeNodeLabel";

const AttributesLabel = memo((
  props: {
    cls: ClassMeta
  }
) => {
  const { cls } = props;
  const t = useTranslate();
  const metaId = useMetaId();
  const addAttribute = useCreateClassAttribute(metaId);

  return (
    <TreeNodeLabel
      action={
        <Button
          type="text"
          shape="circle"
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            addAttribute(cls);
          }}
        >
          <PlusOutlined />
        </Button>
      }
    >
      {t("Atrributes")}
    </TreeNodeLabel>
  )
})

export default AttributesLabel
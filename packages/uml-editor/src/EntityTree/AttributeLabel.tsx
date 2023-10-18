import React, { useCallback } from "react"
import { memo } from "react"
import { useRecoilValue } from 'recoil';
import { selectedElementState } from './../recoil/atoms';
import { Button } from "antd"
import { DeleteOutlined } from "@ant-design/icons"
import { useDeleteAttribute } from "../hooks/useDeleteAttribute";
import { AttributeMeta, CONST_ID } from "@rxdrag/uml-schema";
import { PRIMARY_COLOR } from "../consts";
import { useMetaId } from "../hooks/useMetaId";
import TreeNodeLabel from "./TreeNodeLabel";

const AttributeLabel = memo((
  props: {
    attr: AttributeMeta
  }
) => {
  const { attr } = props;
  const metaId = useMetaId();
  const selectedElement = useRecoilValue(selectedElementState(metaId));
  const removeAttribute = useDeleteAttribute(metaId);

  const handleDelete = useCallback((event: React.MouseEvent) => {
    event.stopPropagation();
    removeAttribute(attr.uuid);
  }, [attr.uuid, removeAttribute]);

  return (
    <TreeNodeLabel
      action={
        attr.name !== CONST_ID &&
        <Button
          type="text"
          shape='circle'
          size='small'
          onClick={handleDelete}
        >
          <DeleteOutlined />
        </Button>
      }
    >
      <div style={{ color: selectedElement === attr.uuid ? PRIMARY_COLOR : undefined }}>
        {attr.name}
        {attr.nullable ? "?" : ""}
      </div>
    </TreeNodeLabel>
  )
})

export default AttributeLabel
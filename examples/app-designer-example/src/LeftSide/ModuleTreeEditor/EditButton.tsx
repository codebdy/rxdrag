import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { memo, useCallback, useState } from "react";
import { Button, Popover } from 'antd';
import { EditForm } from "./EditForm";
import type { FieldNames } from ".";
import { defaultFieldNames } from ".";
import { handleBlockClick } from "./utils";
import styled from "styled-components";

const Title = styled.div`
  padding: 24px 24px 8px 24px;
`

export const EditButton = memo((
  props: {
    treeFieldNames?: FieldNames,
    entityConfig: IEntityConfig,
    onOpenChange?: (open: boolean) => void,
    value?: unknown,
    parent?: unknown,
  }
) => {
  const { treeFieldNames = defaultFieldNames, entityConfig, onOpenChange, value, parent } = props
  const [open, setOpen] = useState(false)

  const handleOpenChange = useCallback((opn: boolean) => {
    setOpen(opn)
    onOpenChange?.(opn)
  }, [onOpenChange])

  const handleCancel = useCallback(() => {
    setOpen(false)
    onOpenChange?.(false)
  }, [onOpenChange])

  return (
    <Popover
      title={<Title
        onClick={handleBlockClick}
      >
        {
          value?.[treeFieldNames.key || ""]
            ? "编辑分组"
            : "新建分组"
        }
      </Title>}
      overlayInnerStyle={{ padding: 0 }}
      open={open}
      content={
        <EditForm
          parent={parent}
          value={value}
          entityConfig={entityConfig}
          treeFieldNames={treeFieldNames}
          onCancel={handleCancel}
          onSaved={handleCancel}
        />
      }
      trigger="click"
      placement="bottom"
      onOpenChange={handleOpenChange}
    >
      {
        value?.[treeFieldNames.key || ""]
          ? <Button type="text" size="small" icon={<EditOutlined />} />
          : <Button size="small" type="text" icon={<PlusOutlined />} />
      }
    </Popover>
  )
})
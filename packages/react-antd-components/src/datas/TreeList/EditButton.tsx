import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { memo, useCallback, useState } from "react";
import { Button, Popover } from 'antd';
import { EditForm } from "./EditForm";
import styled from "styled-components";
import { handleBlockClick } from "./utils";

const Title = styled.div`
  padding: 24px 24px 8px 24px;
`

export const EditButton = memo((
  props: {
    onOpenChange?: (open: boolean) => void,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value?: any,
    parent?: unknown,
    newTitle?: string,
    editTitle?: string,
    idKey: string,
    labelKey: string,
  }
) => {
  const { onOpenChange, value, parent, newTitle, editTitle, idKey, labelKey } = props
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
          value?.[idKey]
            ? newTitle
            : editTitle
        }
      </Title>}
      overlayInnerStyle={{ padding: 0 }}
      open={open}
      content={
        <EditForm
          parent={parent}
          value={value}
          onCancel={handleCancel}
          onSaved={handleCancel}
          idKey={idKey}
          labelKey={labelKey}
        />
      }
      trigger="click"
      placement="bottom"
      onOpenChange={handleOpenChange}
    >
      {
        value?.[idKey]
          ? <Button type="text" size="small" icon={<EditOutlined />} />
          : <Button type="text" size="small"  icon={<PlusOutlined />} />
      }
    </Popover>
  )
})
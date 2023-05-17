import React from "react";
import { DeleteOutlined, EditOutlined, MoreOutlined } from "@ant-design/icons";
import { Button, Dropdown, MenuProps } from "antd";
import { useTranslate } from "@rxdrag/react-locales";
import { memo, useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import { VariableDialog } from "./VariableDialog";
import { IVariableDefineMeta } from "@rxdrag/schema";

const ListItem = styled.div`
  display: flex;
  align-items: center;
`

export const ListItemVariable = memo((
  props: {
    value: IVariableDefineMeta,
    children?: React.ReactNode,
    editTitle: string,
    onChange: (value: IVariableDefineMeta) => void,
    onRemove: (id: string) => void
  }
) => {
  const { value, editTitle, children, onChange, onRemove, ...other } = props
  const [hover, setHover] = useState(false);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const t = useTranslate()

  const handleMouseEnter = useCallback(() => {
    setHover(true);
  }, []);
  const handleMouseLeave = useCallback(() => {
    setHover(false);
  }, []);

  const handleItemClick: MenuProps['onClick'] = useCallback(({ key }: any) => {
    setOpen(false);
    if (key === 'edit') {
      setEditOpen(true)
    } else if (key === "delete") {
      onRemove(value.id)
    }
  }, [onRemove, value.id]);

  const items: MenuProps['items'] = useMemo(() => [
    {
      key: 'edit',
      label: t("edit"),
      icon: <EditOutlined />,
    },
    {
      key: 'delete',
      label: t("delete"),
      icon: <DeleteOutlined />,
    },
  ], [t]);


  const handleCancel = useCallback(() => {
    setEditOpen(false)
  }, [])

  const handleOk = useCallback((newValue?: IVariableDefineMeta) => {
    setEditOpen(false)
    onChange({ ...value, ...newValue })
  }, [onChange, value])

  return (
    <>
      <ListItem
        {...other}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
        {
          (hover || open)
            ? <Dropdown menu={{ items, onClick: handleItemClick }} trigger={['click']} onOpenChange={setOpen} >
              <Button size="small" type="text" icon={<MoreOutlined />} style={{ marginLeft: 8 }} />
            </Dropdown>
            : <div style={{ width: 32 }}></div>
        }

      </ListItem>
      <VariableDialog
        title={editTitle}
        open={editOpen}
        value={value}
        onCancel={handleCancel}
        onOk={handleOk}
      />
    </>
  )
})

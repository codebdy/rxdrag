import { DeleteOutlined, EditOutlined, MoreOutlined } from "@ant-design/icons";
import { Button, Dropdown, MenuProps } from "antd";
import { memo, useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import { NameDialog } from "./NameDialog";
import { useTranslate } from "@rxdrag/react-locales";
import React from "react";

const ListItem = styled.div`
  display: flex;
  align-items: center;
`

export const ListItemReaction = memo((
  props: {
    name: string,
    children?: React.ReactNode,
    editTitle: string,
    id: string,
    onChange: (id: string, name: string) => void,
    onRemove: (id: string) => void
  }
) => {
  const { id, name, editTitle, children, onChange, onRemove, ...other } = props
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
      onRemove(id)
    }
  }, [id, onRemove]);

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


  const handleNameCancel = useCallback(() => {
    setEditOpen(false)
  }, [])

  const handleNameOk = useCallback((value?: string) => {
    setEditOpen(false)
    onChange(id, value || "")
  }, [id, onChange])

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
      <NameDialog
        title={editTitle}
        open={editOpen}
        value={name}
        onCancel={handleNameCancel}
        onOk={handleNameOk}
      />
    </>
  )
})

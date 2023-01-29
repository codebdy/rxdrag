import { DeleteOutlined, EditOutlined, MoreOutlined } from "@ant-design/icons";
import { Button, Dropdown, MenuProps } from "antd";
import { useToolsTranslate } from "core-react/hooks/useToolsTranslate";
import { memo, useCallback, useMemo, useState } from "react";
import styled from "styled-components";

const ListItem = styled.div`
  display: flex;
  align-items: center;
`

export const EditableListItem = memo((
  props: {
    children?: React.ReactNode,
  }
) => {
  const { children, ...other } = props
  const [hover, setHover] = useState(false);
  const [open, setOpen] = useState(false);
  const t = useToolsTranslate()

  const handleMouseEnter = useCallback(() => {
    setHover(true);
  }, []);
  const handleMouseLeave = useCallback(() => {
    setHover(false);
  }, []);

  const items: MenuProps['items'] = useMemo(() => [
    {
      key: '1',
      label: t("edit"),
      icon: <EditOutlined />
    },
    {
      key: '2',
      label: t("delete"),
      icon: <DeleteOutlined />
    },
  ], [t]);


  return (
    <ListItem
      {...other}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {
        (hover || open)
          ? <Dropdown menu={{ items }} trigger={['click']} onOpenChange={setOpen} >
            <Button size="small" type="text" icon={<MoreOutlined />} style={{ marginLeft: 8 }} />
          </Dropdown>
          : <div style={{ width: 32 }}></div>
      }

    </ListItem>
  )
})

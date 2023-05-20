import { DeleteOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { memo, useCallback, useState } from "react";
import styled from "styled-components";
import React from "react";

const ListItem = styled.div`
  display: flex;
  align-items: center;
`

export const ListItemEvent = memo((
  props: {
    children?: React.ReactNode,
    name: string,
    onRemove: (name: string) => void
  }
) => {
  const { name, children, onRemove, ...other } = props
  const [hover, setHover] = useState(false);

  const handleMouseEnter = useCallback(() => {
    setHover(true);
  }, []);
  const handleMouseLeave = useCallback(() => {
    setHover(false);
  }, []);



  const handleRemove = useCallback(() => {
    onRemove(name)
  }, [name, onRemove])

  return (
    <>
      <ListItem
        {...other}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
        {
          (hover)
            ? <Button size="small" type="text" icon={<DeleteOutlined />} onClick={handleRemove} style={{ marginLeft: 8 }} />
            : <div style={{ width: 32 }}></div>
        }

      </ListItem>
    </>
  )
})

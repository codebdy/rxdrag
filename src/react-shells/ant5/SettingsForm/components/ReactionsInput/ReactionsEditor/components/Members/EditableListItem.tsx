import { MoreOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { memo, useCallback, useState } from "react";
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

  const handleMouseEnter = useCallback(() => {
    setHover(true);
  }, []);
  const handleMouseLeave = useCallback(() => {
    setHover(false);
  }, []);

  return (
    <ListItem
      {...other}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {
        hover && <Button size="small" type="text" icon={<MoreOutlined />} style={{ marginLeft: 8 }} />
      }

    </ListItem>
  )
})

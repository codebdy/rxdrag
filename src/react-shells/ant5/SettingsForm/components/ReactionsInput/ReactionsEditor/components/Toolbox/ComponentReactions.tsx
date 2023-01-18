import { CloseOutlined } from "@ant-design/icons";
import { Button, Drawer } from "antd";
import { memo, useState } from "react"
import styled from "styled-components";
import { puzzleIcon } from "../../icons";


const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content:center;
  padding: 8px 16px;
  box-sizing: border-box;
`

export const ComponentReactions = memo(() => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <Container>
      <Button
        type="primary"
        ghost
        onClick={showDrawer}
        icon={puzzleIcon}
      >
        组件控制器
      </Button>
      <Drawer
        title="组件控制器"
        placement="left"
        mask={false}
        getContainer={() => document.getElementById("reactions-editor-container") as any}
        closable={false}
        extra={<Button type="text" icon={<CloseOutlined onClick={onClose} />} />}
        onClose={onClose}
        open={open}
        width={402}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </Container>
  )
})
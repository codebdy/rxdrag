import { CloseOutlined, DownOutlined } from "@ant-design/icons";
import { Button, Drawer, Tree } from "antd";
import { DataNode } from "antd/es/tree";
import { memo, useCallback, useState } from "react"
import styled from "styled-components";
import { maxSizeIcon, minSizeIcon, puzzleIcon } from "../../icons";


const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content:center;
  padding: 8px 16px;
  box-sizing: border-box;
  border-top: solid 1px ${props => props.theme.token?.colorBorder};
`
const treeData: DataNode[] = [
  {
    title: 'parent 1',
    key: '0-0',
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-0',
        children: [
          {
            title: 'leaf',
            key: '0-0-0-0',
          },
          {
            title: 'leaf',
            key: '0-0-0-1',
          },
          {
            title: 'leaf',
            key: '0-0-0-2',
          },
        ],
      },
      {
        title: 'parent 1-1',
        key: '0-0-1',
        children: [
          {
            title: 'leaf',
            key: '0-0-1-0',
          },
        ],
      },
      {
        title: 'parent 1-2',
        key: '0-0-2',
        children: [
          {
            title: 'leaf',
            key: '0-0-2-0',
          },
          {
            title: 'leaf',
            key: '0-0-2-1',
          },
        ],
      },
    ],
  },
];

export const ComponentReactions = memo(() => {
  const [open, setOpen] = useState(false);
  const [maxSize, setMaxSize] = useState(false);

  const handleToggleMaxSize = useCallback(() => {
    setMaxSize(mxSize => !mxSize)
  }, [])

  const handleShowDrawer = useCallback(() => {
    setOpen(open => !open);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <Container>
      <Button
        type="primary"
        ghost
        onClick={handleShowDrawer}
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
        extra={
          <>
            <Button
              type="text"
              icon={
                maxSize
                  ? minSizeIcon
                  : maxSizeIcon
              }

              onClick={handleToggleMaxSize}
            />
            <Button
              type="text"
              icon={<CloseOutlined />}
              onClick={handleClose}
            />
          </>
        }
        onClose={handleClose}
        open={open}
        width={maxSize ? 402 : 220}
      >
        <Tree
          showLine
          switcherIcon={<DownOutlined />}
          defaultExpandedKeys={['0-0-0']}
          treeData={treeData}
        />
      </Drawer>
    </Container>
  )
})
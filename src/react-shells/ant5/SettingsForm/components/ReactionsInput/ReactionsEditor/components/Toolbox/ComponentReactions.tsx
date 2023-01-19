import { CloseOutlined, DownOutlined } from "@ant-design/icons";
import { Button, Drawer, Tree } from "antd";
import { DataNode } from "antd/es/tree";
import { memo, useCallback, useState } from "react"
import styled from "styled-components";
import { maxSizeIcon, methodIcon, minSizeIcon, puzzleIcon } from "../../../../../../icons/reactions";

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content:center;
  padding: 8px 16px;
  box-sizing: border-box;
  border-top: solid 1px ${props => props.theme.token?.colorBorder};
`

const Content = styled.div`
  flex:1;
  height: 100%;
  display: flex;
  flex-flow: column;
  padding: 8px;
  overflow: auto;
`

const ItemTitle = styled.div`
  border: ${props => props.theme.token?.colorBorder} solid 1px;
  padding: 0 6px; 
  border-radius: 4px;
  cursor: move;
`

const treeData: DataNode[] = [
  {
    title: '两列布局',
    key: '0-0',
    children: [
      {
        title: '数据列表',
        key: '0-0-0',
        children: [
          {
            title: '分页',
            key: '0-0-0-0',
          },
          {
            title: '查询表单',
            key: '0-0-0-1',
            children: [
              {
                title: <ItemTitle>{methodIcon} 读取数据</ItemTitle>,
                key: '0-0-0-1-2',
              },
            ]
          },
          {
            title: <ItemTitle> {methodIcon} 设置状态</ItemTitle>,
            key: '0-0-0-2',
          },
          {
            title: <ItemTitle>{methodIcon} 设置变量</ItemTitle>,
            key: '0-0-0-3',
          },
          {
            title: <ItemTitle>{methodIcon} 读取变量</ItemTitle>,
            key: '0-0-0-4',
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
  {
    title: '组件自身',
    key: '0-1',
  }
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
        <Content>
          <Tree
            showLine
            switcherIcon={<DownOutlined />}
            showIcon={true}
            defaultExpandedKeys={['0-0-0']}
            treeData={treeData}
            rootStyle={{ backgroundColor: "transparent" }}
          />
        </Content>
      </Drawer>
    </Container>
  )
})
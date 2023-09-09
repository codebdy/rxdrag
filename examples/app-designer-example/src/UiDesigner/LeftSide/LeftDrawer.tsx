import { CloseOutlined } from "@ant-design/icons"
import { ResizableColumn, floatShadow } from "@rxdrag/react-antd-shell"
import { Button, Tree } from "antd"
import { DataNode, DirectoryTreeProps } from "antd/es/tree"
import { Key, memo, useCallback, useMemo, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"

const maxWidth = 1000
const minWidth = 300

const DrawerShell = styled(ResizableColumn)`
  position: absolute;
  top: 0;
  left: calc(100% + 0px);
  height:100%;
  border-radius: 0px;
  background-color: ${props => props.theme.token?.colorBgBase};
  box-shadow: ${floatShadow};
  border: solid 1px ${props => props.theme.token?.colorBorderSecondary};
  .ant-tabs-nav{
    user-select: none;
    &::before{
      border: 0;
    }
  }
  &.closed{
    opacity: 0;
  }

`
const Title = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  padding: 0 16px;
  padding-right: 8px;
  border-bottom: solid 1px ${props => props.theme.token?.colorBorder};
  font-size: 14px;
`

const TitleContent = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`

const Content = styled.div`
  padding: 8px;
  .ant-tree{
    background-color: transparent;
    min-width: 200px;
  }
`

const { DirectoryTree } = Tree;

const treeData: DataNode[] = [
  {
    title: '基础模块',
    key: 'basics',
    children: [
      { title: '用户管理', key: 'users', isLeaf: true },
    ],
  },
  {
    title: '客户管理',
    key: 'crm',
    children: [
      { title: '供应商', key: 'suppliers', isLeaf: true },
      { title: '客户', key: 'customers', isLeaf: true },
    ],
  },
];


export const LeftDrawer = memo((
  props: {
    onSelectChange?: (selected?: string) => void,
    title?: React.ReactNode,
    open?: boolean,
    onOpenChange?: (open?: boolean) => void
  }
) => {
  const { onSelectChange, title, open, onOpenChange } = props
  const [width, setWidth] = useState(320)
  const { moduleId } = useParams()
  const navigate = useNavigate()
  const realWidth = useMemo(() => {
    return open ? width : 0
  }, [open, width])

  const handleClose = useCallback(() => {
    onOpenChange?.(false)
  }, [onOpenChange])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSelect: DirectoryTreeProps['onSelect'] = useCallback((keys: Key[], root: any) => {
    if (root.node.children) {
      return
    }
    const id = keys?.[0].toString() || ""
    navigate("modules/" + id)
    onSelectChange?.(id)
  }, [navigate, onSelectChange]);

  return (
    <DrawerShell
      maxWidth={maxWidth}
      minWidth={open ? minWidth : 0}
      width={realWidth}
      onWidthChange={setWidth}
      className={!open ? "closed" : undefined}
    >
      <Title>
        <TitleContent>
          {title}
        </TitleContent>
        <Button
          size="small"
          type="text"
          icon={<CloseOutlined />}
          onClick={handleClose}
        />
      </Title>
      <Content>
        <DirectoryTree
          selectedKeys={[moduleId || ""]}
          multiple={false}
          defaultExpandAll
          onSelect={handleSelect}
          treeData={treeData}
        />
      </Content>
    </DrawerShell>
  )
})
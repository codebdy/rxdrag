import { CloseOutlined } from "@ant-design/icons"
import { ResizableColumn, floatShadow } from "@rxdrag/react-antd-shell"
import { Button, Tree } from "antd"
import { DataNode, DirectoryTreeProps } from "antd/es/tree"
import { Key, memo, useCallback, useMemo, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"
import { DeviceType } from "../../interfaces"
import { useAppFrontend } from "../../hooks/useAppFrontend"

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

const treeData: { [device: string]: DataNode[] } = {
  [DeviceType.admin]: [
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
  ],
  [DeviceType.h5]: [
    {
      title: '基础模块(H5)',
      key: 'basics',
      children: [
        { title: '用户管理(H5)', key: 'users', isLeaf: true },
      ],
    },
    {
      title: '客户管理(H5)',
      key: 'crm',
      children: [
        { title: '供应商(H5)', key: 'suppliers', isLeaf: true },
        { title: '客户(H5)', key: 'customers', isLeaf: true },
      ],
    },
  ],
  [DeviceType.website]: [
    {
      title: '基础模块(门户)',
      key: 'basics',
      children: [
        { title: '用户管理(门户)', key: 'users', isLeaf: true },
      ],
    },
    {
      title: '客户管理(门户)',
      key: 'crm',
      children: [
        { title: '供应商(门户)', key: 'suppliers', isLeaf: true },
        { title: '客户(门户)', key: 'customers', isLeaf: true },
      ],
    },
  ],
  [DeviceType.largeScreen]: [
    {
      title: '基础模块(大屏)',
      key: 'basics',
      children: [
        { title: '用户管理(大屏)', key: 'users', isLeaf: true },
      ],
    },
    {
      title: '客户管理(大屏)',
      key: 'crm',
      children: [
        { title: '供应商(大屏)', key: 'suppliers', isLeaf: true },
        { title: '客户(大屏)', key: 'customers', isLeaf: true },
      ],
    },
  ],
};


export const LeftDrawer = memo((
  props: {
    title?: React.ReactNode,
    open?: boolean,
    onOpenChange?: (open?: boolean) => void
  }
) => {
  const { title, open, onOpenChange } = props
  const [width, setWidth] = useState(320)
  const { moduleId } = useParams()
  const device = useAppFrontend()?.deviceType
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
    onOpenChange?.(false)
  }, [navigate, onOpenChange]);

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
          treeData={treeData[device || ""]}
        />
      </Content>
    </DrawerShell>
  )
})
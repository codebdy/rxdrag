import { Tree } from "antd"
import { DataNode, DirectoryTreeProps } from "antd/es/tree"
import { Key, memo, useCallback } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { DeviceType } from "../../interfaces"
import { useAppFrontend } from "../../hooks/useAppFrontend"
import { LeftDrawer } from "./LeftDrawer"


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


export const ModulesDrawer = memo((
  props: {
    title?: React.ReactNode,
    open?: boolean,
    onOpenChange?: (open?: boolean) => void
  }
) => {
  const { title, open, onOpenChange } = props
  const { moduleId } = useParams()
  const device = useAppFrontend()?.deviceType
  const navigate = useNavigate()

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
    <LeftDrawer
      title={title}
      open={open}
      onOpenChange={onOpenChange}
    >
      <DirectoryTree
        selectedKeys={[moduleId || ""]}
        multiple={false}
        defaultExpandAll
        onSelect={handleSelect}
        treeData={treeData[device || ""]}
      />
    </LeftDrawer>
  )
})
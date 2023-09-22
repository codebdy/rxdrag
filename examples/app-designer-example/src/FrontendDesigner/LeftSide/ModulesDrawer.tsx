import { Tree } from "antd"
import { DataNode, DirectoryTreeProps } from "antd/es/tree"
import { Key, memo, useCallback, useMemo } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useAppFrontend } from "../../hooks/useAppFrontend"
import { LeftDrawer } from "./LeftDrawer"

const { DirectoryTree } = Tree;

export const ModulesDrawer = memo((
  props: {
    title?: React.ReactNode,
    open?: boolean,
    onOpenChange?: (open?: boolean) => void
  }
) => {
  const { title, open, onOpenChange } = props
  const { moduleId } = useParams()
  const appFront = useAppFrontend()
  const navigate = useNavigate()

  const treeData: DataNode[] = useMemo(() => {
    return appFront?.moduleCategories?.map(category => {
      return {
        key: category.id,
        title: category.title,
        children: category.modules?.map(module => {
          return {
            key: module.id,
            title: module.title,
            isLeaf: true,
          }
        })
      }
    }) || []
  }, [appFront?.moduleCategories])

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
        treeData={treeData}
      />
    </LeftDrawer>
  )
})
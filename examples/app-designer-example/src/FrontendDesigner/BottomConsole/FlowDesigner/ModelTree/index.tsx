import { Tree } from "antd";
import { memo, useMemo } from "react"
import { TreeContainer } from "../../common/TreeContainer";
import { DataNode } from "antd/es/tree";
import { useMeta } from "../../../hooks/useMeta";
const { DirectoryTree } = Tree;

export const ModelTree = memo((
  props: {
    display?: boolean,
  }
) => {
  const { display } = props;
  const meta = useMeta()

  const treeData: DataNode[] = useMemo(() => {
    return meta?.packages?.map(pkg => ({
      key: pkg.uuid,
      title: pkg.name,
      seletable: false,
      //children: getSchemaTreeOfView(pkg.id)?.map(schema => getOneNode(schema)),
    })) || []
  }, [meta?.packages])

  return <TreeContainer
    className={!display ? "hidden" : undefined}
  >
    <DirectoryTree
      selectable={false}
      treeData={treeData}
    />
  </TreeContainer>
})
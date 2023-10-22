import { Tree } from "antd";
import { memo, useCallback, useMemo } from "react"
import { TreeContainer } from "../../common/TreeContainer";
import { DataNode } from "antd/es/tree";
import { useMeta } from "../../../hooks/useMeta";
import { useGetPackageEntities } from "../../../hooks/useGetPackageEntities";
import { ClassMeta } from "@rxdrag/uml-schema";
import { SvgIcon, classIcon } from "@rxdrag/react-shared";
import { getListNode } from "./getListNode";
import { getSaveNode } from "./getSaveNode";
import { getEntityNode } from "./getEntityNode";

const { DirectoryTree } = Tree;

export const ModelTree = memo((
  props: {
    display?: boolean,
  }
) => {
  const { display } = props;
  const meta = useMeta()
  const getPackageEntities = useGetPackageEntities()

  const getOneNode = useCallback((cls: ClassMeta): DataNode => {

    return {
      key: cls.uuid,
      icon: <SvgIcon> {classIcon}</SvgIcon>,
      title: cls.label || cls.name,
      children: [
        getListNode(cls),
        getEntityNode(cls),
        getSaveNode(cls)
      ]
    }
  }, [])

  const treeData: DataNode[] = useMemo(() => {
    return meta?.packages?.map(pkg => ({
      key: pkg.uuid,
      title: pkg.name,
      children: getPackageEntities(pkg.uuid)?.map(cls => getOneNode(cls)),
    })) || []
  }, [getOneNode, getPackageEntities, meta?.packages])

  return <TreeContainer
    className={!display ? "hidden" : undefined}
  >
    <DirectoryTree
      selectable={false}
      treeData={treeData}
    />
  </TreeContainer>
})
import { Tree } from "antd";
import { memo, useCallback, useMemo } from "react"
import { TreeContainer } from "../../common/TreeContainer";
import { DataNode } from "antd/es/tree";
import { useMeta } from "../../../hooks/useMeta";
import { useGetPackageEntities } from "../../../hooks/useGetPackageEntities";
import { ClassMeta } from "@rxdrag/uml-schema";
import { SvgIcon, classIcon } from "@rxdrag/react-shared";
import { queryOneEntityMaterial } from "../../../../minions/materials/QueryOneEntity"
import { useTransMaterial } from "@rxdrag/logicflow-editor-antd5";
import { getModelNode } from "./getModelNode";
import { queryEntitiesMaterial } from "../../../../minions/materials/QueryEntities";
import { saveEntityMaterial } from "../../../../minions/materials/SaveEntity";
import { removeEntityMaterial } from "../../../../minions/materials/RemoveEntity";

const { DirectoryTree } = Tree;

export const ModelTree = memo((
  props: {
    display?: boolean,
  }
) => {
  const { display } = props;
  const meta = useMeta()
  const getPackageEntities = useGetPackageEntities()
  const t = useTransMaterial()
  const oneMaterial = useMemo(() => t(queryOneEntityMaterial), [t])
  const listMaterial = useMemo(() => t(queryEntitiesMaterial), [t])
  const saveMaterial = useMemo(() => t(saveEntityMaterial), [t])
  const removeMaterial = useMemo(() => t(removeEntityMaterial), [t])
  const getOneNode = useCallback((cls: ClassMeta): DataNode => {

    return {
      key: cls.uuid,
      icon: <SvgIcon> {classIcon}</SvgIcon>,
      title: cls.label || cls.name,
      children: [
        getModelNode(cls, listMaterial, "query-list"),
        getModelNode(cls, oneMaterial, "query-one"),
        getModelNode(cls, saveMaterial, "save"),
        getModelNode(cls, removeMaterial, "remove"),
      ]
    }
  }, [listMaterial, oneMaterial, removeMaterial, saveMaterial])

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
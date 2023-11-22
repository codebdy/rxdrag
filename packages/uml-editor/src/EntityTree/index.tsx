import { memo, useCallback, useMemo, } from "react";
import { Graph } from "@antv/x6";
import { Tree } from "antd";
import { useRecoilState, useRecoilValue } from 'recoil';
import PackageLabel from "./PackageLabel";
import { ClassIcon } from "../components/svgs";
import { useIsDiagram } from "../hooks/useIsDiagram";
import ClassLabel from "./ClassLabel";
import { useParseRelationUuid } from "../hooks/useParseRelationUuid";
import { useGetSourceRelations } from './../hooks/useGetSourceRelations';
import { useGetTargetRelations } from './../hooks/useGetTargetRelations';
import { useGetClass } from "../hooks/useGetClass";
import AttributeLabel from "./AttributeLabel";
import AttributesLabel from "./AttributesLabel";
import RelationLabel from "./RelationLabel";
import DiagramLabel from "./DiagramLabel";
import { DataNode } from "antd/es/tree";
import styled from "styled-components";
import { useMetaId } from "../hooks/useMetaId";
import { ModelRootAction } from "./ModelRootAction";
import { AttributeMeta, ClassMeta, StereoType, PackageMeta } from "@rxdrag/uml-schema";
import { PRIMARY_COLOR } from "../consts";
import { packagesState, diagramsState, classesState, selectedUmlDiagramState, selectedElementState } from "../recoil/atoms";
import TreeNodeLabel from "./TreeNodeLabel";
import { useTranslate } from "@rxdrag/react-locales";
import { SvgIcon } from "../components/SvgIcon";
import PlugIcon from "../components/PlugIcon";
const { DirectoryTree } = Tree;

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-flow: column;
  border: solid 1px  ${props => props.theme.token?.colorBorderSecondary};
  border-left: 0;
  overflow: auto;
  .ant-tree-node-content-wrapper{
    display: flex;
    .ant-tree-title{
      flex:1;
  }
}
`

const StyledDirectoryTree = styled(DirectoryTree)`
  padding-top: 16px;
  flex: 1;
  background-color: transparent;
`

export const EntityTree = memo((props: { graph?: Graph }) => {
  const { graph } = props;
  const metaId = useMetaId();
  const packages = useRecoilValue(packagesState(metaId));
  const diagrams = useRecoilValue(diagramsState(metaId));
  const classes = useRecoilValue(classesState(metaId));
  const isDiagram = useIsDiagram(metaId);
  const parseRelationUuid = useParseRelationUuid();
  const [selectedDiagramId, setSelecteDiagramId] = useRecoilState(selectedUmlDiagramState(metaId));
  const [selectedElement, setSelectedElement] = useRecoilState(selectedElementState(metaId));
  const getSourceRelations = useGetSourceRelations(metaId);
  const getTargetRelations = useGetTargetRelations(metaId);
  const getClass = useGetClass(metaId);
  const t = useTranslate();

  const getAttributeNode = useCallback((attr: AttributeMeta) => {
    const color = selectedElement === attr.uuid ? PRIMARY_COLOR : undefined
    return {
      icon: <SvgIcon>
        <svg
          style={{ width: "12px", height: "12px" }}
          viewBox="0 0 24 24"
          fill={color || "currentColor"}
        >
          <path
            fill={selectedElement === attr.uuid ? PRIMARY_COLOR : undefined}
            d="M12 2C11.5 2 11 2.19 10.59 2.59L2.59 10.59C1.8 11.37 1.8 12.63 2.59 13.41L10.59 21.41C11.37 22.2 12.63 22.2 13.41 21.41L21.41 13.41C22.2 12.63 22.2 11.37 21.41 10.59L13.41 2.59C13 2.19 12.5 2 12 2M12 4L20 12L12 20L4 12Z"
          />
        </svg>
      </SvgIcon>,
      title: <AttributeLabel attr={attr} />,
      key: attr.uuid,
      isLeaf: true,
    }
  }, [selectedElement]);

  const getClassAttributesNode = useCallback((cls: ClassMeta) => {
    return {
      title: <AttributesLabel cls={cls} />,
      key: cls.uuid + "attributes",
      children: cls.attributes.map(attr => getAttributeNode(attr))
    }
  }, [getAttributeNode])

  const getClassRelationsNode = useCallback((cls: ClassMeta) => {
    const children = [];
    const sourceRelations = getSourceRelations(cls.uuid);
    const targetRelations = getTargetRelations(cls.uuid);
    const icon = (color?: string) => <SvgIcon>
      <svg style={{ width: "12px", height: "12px" }} viewBox="0 0 24 24" fill={color || "currentColor"}>
        <path
          fill={color || "currentColor"}
          d="M22 13V19H21L19 17H11V9H5L3 11H2V5H3L5 7H13V15H19L21 13Z"
        /></svg>
    </SvgIcon>;
    for (const relation of sourceRelations) {
      children.push(
        {
          icon: icon(selectedElement === relation.uuid ? PRIMARY_COLOR : undefined),
          title: <RelationLabel
            title={relation.roleOfTarget + ":" + getClass(relation.targetId)?.name}
            relation={relation}
          />,
          key: cls.uuid + "," + relation.uuid,
          isLeaf: true,
        }
      )
    }
    for (const relation of targetRelations) {
      children.push(
        {
          icon: icon(selectedElement === relation.uuid ? PRIMARY_COLOR : undefined),
          title: <RelationLabel
            title={relation.roleOfSource + ":" + getClass(relation.sourceId)?.name}
            relation={relation}
          />,
          key: cls.uuid + "," + relation.uuid,
          isLeaf: true,
        }
      )
    }
    return {
      title: t("Relationships"),
      key: cls.uuid + "relations",
      children: children,
    }
  }, [getClass, getSourceRelations, getTargetRelations, selectedElement, t])


  const getClassNode = useCallback((cls: ClassMeta) => {
    const children = [];
    if (cls.stereoType !== StereoType.Service) {
      children.push(getClassAttributesNode(cls))
    }

    if (cls.stereoType === StereoType.Entity) {
      const relations = getClassRelationsNode(cls);
      relations.children?.length > 0 && children.push(relations)
    }
    const color = selectedElement === cls.uuid ? PRIMARY_COLOR : undefined;
    return {
      icon: cls.root
        ? <PlugIcon size="14px" color={color} />
        : <SvgIcon><ClassIcon color={color} /></SvgIcon>,
      title: <ClassLabel cls={cls} graph={graph} />,
      key: cls.uuid,
      children: children,
    }
  }, [selectedElement, graph, getClassAttributesNode, getClassRelationsNode])

  const getClassCategoryNode = useCallback((title: string, key: string, clses: ClassMeta[]) => {
    return {
      title: title,
      key: key,
      children: clses.map(cls => getClassNode(cls))
    }
  }, [getClassNode])


  const getPackageChildren = useCallback((pkg: PackageMeta) => {
    const packageChildren: DataNode[] = []
    const abstracts = classes.filter(cls => cls.stereoType === StereoType.Abstract && cls.packageUuid === pkg.uuid)
    const entities = classes.filter(cls => cls.stereoType === StereoType.Entity && cls.packageUuid === pkg.uuid)
    const enums = classes.filter(cls => cls.stereoType === StereoType.Enum && cls.packageUuid === pkg.uuid)
    const valueObjects = classes.filter(cls => cls.stereoType === StereoType.ValueObject && cls.packageUuid === pkg.uuid)

    if (abstracts.length > 0) {
      packageChildren.push(getClassCategoryNode(t("AbstractClass"), pkg.uuid + "abstracts", abstracts))
    }
    if (entities.length > 0) {
      packageChildren.push(getClassCategoryNode(t("EntityClass"), pkg.uuid + "entities", entities))
    }
    if (enums.length > 0) {
      packageChildren.push(getClassCategoryNode(t("EnumClass"), pkg.uuid + "enums", enums))
    }
    if (valueObjects.length > 0) {
      packageChildren.push(getClassCategoryNode(t("ValueClass"), pkg.uuid + "valueObjects", valueObjects))
    }

    for (const diagram of diagrams.filter(diagram => diagram.packageUuid === pkg.uuid)) {
      packageChildren.push({
        title: <DiagramLabel diagram={diagram} />,
        key: diagram.uuid,
        isLeaf: true,
      })
    }

    return packageChildren;
  }, [classes, getClassCategoryNode, t, diagrams])

  const getModelPackageNodes = useCallback(() => {

    return packages.map((pkg) => {
      return {
        title: <PackageLabel pkg={pkg} />,
        key: pkg.uuid,
        children: getPackageChildren(pkg),
      }
    })
  }, [packages, getPackageChildren]);

  const treeData: DataNode[] = useMemo(() => {
    const modelNode = {
      icon: <SvgIcon>
        <svg style={{ width: "16px", height: "16px" }} viewBox="0 0 1024 1024" fill="currentColor">
          <path d="M907.8 226.4l0.1-0.2L526 98.2l-13.4-4.5c-0.4-0.1-0.8-0.1-1.2 0l-13.3 4.5-381.8 128 0.1 0.2c-7.7 3.2-13.4 10.7-13.4 20v509.4c0 0.7 0.4 1.4 1.1 1.7l382 162.1 13.2 5.6 12.1 5.1c0.5 0.2 1 0.2 1.4 0l12.1-5.1 13.2-5.6 382-162.1c0.7-0.3 1.1-0.9 1.1-1.7V246.3c-0.1-9.2-5.8-16.7-13.4-19.9zM483.5 862L156 723c-0.7-0.3-1.1-0.9-1.1-1.7V294.9c0-1.3 1.3-2.2 2.5-1.7l327.5 139c0.7 0.3 1.1 0.9 1.1 1.7v426.4c0 1.3-1.3 2.2-2.5 1.7z m27.8-475L201.9 255.6c-1.5-0.7-1.5-2.9 0.1-3.4l310.1-103.9 310 103.9c1.6 0.5 1.7 2.7 0.1 3.4L512.7 387c-0.4 0.2-1 0.2-1.4 0zM868 723L540.5 862c-1.2 0.5-2.5-0.4-2.5-1.7V433.9c0-0.7 0.4-1.4 1.1-1.7l327.5-139c1.2-0.5 2.5 0.4 2.5 1.7v426.4c0 0.7-0.4 1.4-1.1 1.7z"></path>
        </svg>
      </SvgIcon>,
      title:
        <TreeNodeLabel fixedAction action={<ModelRootAction />}>
          <div>{t("DomainModel")}</div>
        </TreeNodeLabel>,
      key: "0",
      children: getModelPackageNodes()
    }

    return [
      modelNode,

    ]
  }, [getModelPackageNodes, t]);

  const handleSelect = useCallback((keys: string[]) => {
    for (const uuid of keys) {
      if (isDiagram(uuid)) {
        setSelecteDiagramId(uuid);
      } else {
        const relationUuid = parseRelationUuid(uuid);
        if (relationUuid) {
          setSelectedElement(relationUuid);
        }
      }
    }
  }, [isDiagram, parseRelationUuid, setSelecteDiagramId, setSelectedElement])

  return (
    <Container>
      <StyledDirectoryTree
        defaultExpandedKeys={["0"]}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        selectedKeys={[selectedDiagramId] as any}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onSelect={handleSelect as any}
        treeData={treeData}
      />
    </Container>
  );
});

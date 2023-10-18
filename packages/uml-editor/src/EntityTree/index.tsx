import { memo, useCallback, useMemo, } from "react";
import { Graph } from "@antv/x6";
import { Tree } from "antd";
import SvgIcon from "common/SvgIcon";
import { useRecoilState, useRecoilValue } from 'recoil';
import { packagesState, diagramsState, classesState, selectedUmlDiagramState, selectedElementState, editorOptionsState, selectedScriptLogicIdState, selectedGraphLogicIdState, selectedApiIdState, selectedCodeIdState } from './../recoil/atoms';
import TreeNodeLabel from "common/TreeNodeLabel";
import PackageLabel from "./PackageLabel";
import { PackageMeta } from "../meta/PackageMeta";
import { ClassMeta, StereoType } from "../meta/ClassMeta";
import { ClassIcon } from "./svgs";
import { useIsDiagram } from "../hooks/useIsDiagram";
import { useIsElement } from "../hooks/useIsElement";
import ClassLabel from "./ClassLabel";
import { AttributeMeta } from './../meta/AttributeMeta';
import { useParseRelationUuid } from "../hooks/useParseRelationUuid";
import { useGetSourceRelations } from './../hooks/useGetSourceRelations';
import { useGetTargetRelations } from './../hooks/useGetTargetRelations';
import { useGetClass } from "../hooks/useGetClass";
import AttributeLabel from "./AttributeLabel";
import { PRIMARY_COLOR } from "consts";
import AttributesLabel from "./AttributesLabel";
import RelationLabel from "./RelationLabel";
import { useTranslation } from "react-i18next";
import PlugIcon from "icons/PlugIcon";
import DiagramLabel from "./DiagramLabel";
import { DataNode } from "antd/es/tree";
import styled from "styled-components";
import { useMetaId } from "../hooks/useMetaId";
import { ModelRootAction } from "./ModelRootAction";
import { APIRootAction } from "./APIRootAction";
import { ScriptLogicRootAction } from "./ScriptLogicRootAction";
import { CodeOutlined } from "@ant-design/icons";
import { GraphLogicRootAction } from "./GraphLogicRootAction";
import { useGetScriptNodes } from "./useGetScriptNodes";
import { useGetGraphNodes } from "./useGetGraphNodes";
import { useIsScriptLogic } from "UmlEditor/hooks/useIsScriptLogic";
import { useIsGraphLogic } from "UmlEditor/hooks/useIsGraphLogic";
import { useGetApiNodes } from "./useGetApiNodes";
import { useIsApi } from "UmlEditor/hooks/useIsApi";
import { useIsCode } from "UmlEditor/hooks/useIsCode";
const { DirectoryTree } = Tree;

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-flow: column;
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
`

export const EntityTree = memo((props: { graph?: Graph }) => {
  const { graph } = props;
  const metaId = useMetaId();
  const options = useRecoilValue(editorOptionsState(metaId));
  const packages = useRecoilValue(packagesState(metaId));
  const diagrams = useRecoilValue(diagramsState(metaId));
  const classes = useRecoilValue(classesState(metaId));
  const [selectedScriptId, setSelectedScriptId] = useRecoilState(selectedScriptLogicIdState(metaId));
  const [selectedGraphLogicId, setSelectGraphLogicId] = useRecoilState(selectedGraphLogicIdState(metaId));
  const [selectedCodeId, setSelectCodeId] = useRecoilState(selectedCodeIdState(metaId));
  const [selectedApiId, setSelectApiId] = useRecoilState(selectedApiIdState(metaId));
  const isDiagram = useIsDiagram(metaId);
  const isScriptLogic = useIsScriptLogic(metaId)
  const isGraphLogic = useIsGraphLogic(metaId)
  const isCode = useIsCode(metaId)
  const isApi = useIsApi(metaId)
  const isElement = useIsElement(metaId);
  const parseRelationUuid = useParseRelationUuid(metaId);
  const [selectedDiagramId, setSelecteDiagramId] = useRecoilState(selectedUmlDiagramState(metaId));
  const [selectedElement, setSelectedElement] = useRecoilState(selectedElementState(metaId));
  const getSourceRelations = useGetSourceRelations(metaId);
  const getTargetRelations = useGetTargetRelations(metaId);
  const getClass = useGetClass(metaId);
  const { t } = useTranslation();

  const getScriptLogicNodes = useGetScriptNodes()
  const getMetaLogicNodes = useGetGraphNodes()
  const getApiNodes = useGetApiNodes()

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
      title: t("UmlEditor.Relationships"),
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
      icon: cls.root ?
        <PlugIcon size={"14px"} color={color} />
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
      packageChildren.push(getClassCategoryNode(t("UmlEditor.AbstractClass"), pkg.uuid + "abstracts", abstracts))
    }
    if (entities.length > 0) {
      packageChildren.push(getClassCategoryNode(t("UmlEditor.EntityClass"), pkg.uuid + "entities", entities))
    }
    if (enums.length > 0) {
      packageChildren.push(getClassCategoryNode(t("UmlEditor.EnumClass"), pkg.uuid + "enums", enums))
    }
    if (valueObjects.length > 0) {
      packageChildren.push(getClassCategoryNode(t("UmlEditor.ValueClass"), pkg.uuid + "valueObjects", valueObjects))
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
          <div>{t("UmlEditor.DomainModel")}</div>
        </TreeNodeLabel>,
      key: "0",
      children: getModelPackageNodes()
    }

    const scriptNode: DataNode = {
      icon: <CodeOutlined />,
      title:
        <TreeNodeLabel fixedAction action={<ScriptLogicRootAction />}>
          <div>{t("UmlEditor.LogicScripts")}</div>
        </TreeNodeLabel>,
      key: "1",
      children: getScriptLogicNodes()
    }
    const graphLogicsNode: DataNode = {
      icon: <SvgIcon>
        <svg style={{ width: "16px", height: "16px" }} viewBox="0 0 1024 1024" fill="currentColor">
          <path d="M571.945277 122.592083 452.423113 122.592083c-49.502437 0-89.6406 40.139186-89.6406 89.6406 0 49.502437 40.139186 89.641623 89.6406 89.641623l119.521141 0c49.502437 0 89.641623-40.139186 89.641623-89.641623C661.585877 162.730245 621.446691 122.592083 571.945277 122.592083L571.945277 122.592083zM571.945277 242.113223 452.423113 242.113223c-16.434298 0-29.880541-13.446243-29.880541-29.880541 0-16.434298 13.446243-29.880541 29.880541-29.880541l119.521141 0c16.434298 0 29.880541 13.446243 29.880541 29.880541C601.824795 228.66698 588.379575 242.113223 571.945277 242.113223L571.945277 242.113223zM571.945277 421.395446 452.423113 421.395446c-49.502437 0-89.6406 40.139186-89.6406 89.6406 0 49.502437 40.139186 89.641623 89.6406 89.641623l119.521141 0c49.502437 0 89.641623-40.139186 89.641623-89.641623C661.585877 461.534632 621.446691 421.395446 571.945277 421.395446L571.945277 421.395446zM571.945277 540.916587 452.423113 540.916587c-16.434298 0-29.880541-13.446243-29.880541-29.880541 0-16.434298 13.446243-29.880541 29.880541-29.880541l119.521141 0c16.434298 0 29.880541 13.446243 29.880541 29.880541C601.824795 527.470343 588.379575 540.916587 571.945277 540.916587L571.945277 540.916587zM571.945277 720.198809 452.423113 720.198809c-49.502437 0-89.6406 40.139186-89.6406 89.6406s40.139186 89.6406 89.6406 89.6406l119.521141 0c49.502437 0 89.641623-40.139186 89.641623-89.6406S621.446691 720.198809 571.945277 720.198809L571.945277 720.198809zM571.945277 839.71995 452.423113 839.71995c-16.434298 0-29.880541-13.446243-29.880541-29.880541 0-16.434298 13.446243-29.880541 29.880541-29.880541l119.521141 0c16.434298 0 29.880541 13.446243 29.880541 29.880541C601.824795 826.273706 588.379575 839.71995 571.945277 839.71995L571.945277 839.71995zM243.261373 779.959891c-31.972179 0-61.951981-12.450567-84.561931-34.960233-22.509666-22.60995-34.960233-52.589752-34.960233-84.560908 0-31.972179 12.450567-61.951981 34.960233-84.561931 22.60995-22.60995 52.589752-34.960233 84.561931-34.960233l59.761082 0 0-59.761082-59.761082 0c-99.002828 0-179.282223 80.279395-179.282223 179.282223l0 0c0 99.002828 80.279395 179.282223 179.282223 179.282223l0 59.761082 89.6406-89.6406-89.6406-89.6406L243.261373 779.959891 243.261373 779.959891zM781.107017 182.352141l-59.761082 0 0 59.761082 59.761082 0c31.972179 0 61.951981 12.450567 84.560908 34.960233 22.60995 22.60995 34.960233 52.589752 34.960233 84.560908 0 31.972179-12.450567 61.951981-34.960233 84.561931-22.60995 22.509666-52.589752 34.960233-84.560908 34.960233l0-59.761082-89.6406 89.6406 89.6406 89.641623 0-59.761082c99.002828 0 179.282223-80.279395 179.282223-179.282223l0 0C960.38924 262.631536 880.110869 182.352141 781.107017 182.352141L781.107017 182.352141z"></path>
        </svg>
      </SvgIcon>,
      title:
        <TreeNodeLabel fixedAction action={<GraphLogicRootAction />}>
          <div>{t("UmlEditor.GraphLogics")}</div>
        </TreeNodeLabel>,
      key: "2",
      children: getMetaLogicNodes()
    }

    let apiNodes: DataNode[] = [scriptNode,
      graphLogicsNode,]
    if (options?.supportCustomizedApi) {
      apiNodes = [{
        icon: <SvgIcon>
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="1rem" height="1rem" viewBox="0 0 24 24"><path d="M12,5.37L11.56,5.31L6,14.9C6.24,15.11 6.4,15.38 6.47,15.68H17.53C17.6,15.38 17.76,15.11 18,14.9L12.44,5.31L12,5.37M6.6,16.53L10.88,19.06C11.17,18.79 11.57,18.63 12,18.63C12.43,18.63 12.83,18.79 13.12,19.06L17.4,16.53H6.6M12,22A1.68,1.68 0 0,1 10.32,20.32L10.41,19.76L6.11,17.21C5.8,17.57 5.35,17.79 4.84,17.79A1.68,1.68 0 0,1 3.16,16.11C3.16,15.32 3.69,14.66 4.42,14.47V9.36C3.59,9.25 2.95,8.54 2.95,7.68A1.68,1.68 0 0,1 4.63,6C5.18,6 5.66,6.26 5.97,6.66L10.38,4.13L10.32,3.68C10.32,2.75 11.07,2 12,2C12.93,2 13.68,2.75 13.68,3.68L13.62,4.13L18.03,6.66C18.34,6.26 18.82,6 19.37,6A1.68,1.68 0 0,1 21.05,7.68C21.05,8.54 20.41,9.25 19.58,9.36V14.47C20.31,14.66 20.84,15.32 20.84,16.11A1.68,1.68 0 0,1 19.16,17.79C18.65,17.79 18.2,17.57 17.89,17.21L13.59,19.76L13.68,20.32A1.68,1.68 0 0,1 12,22M10.8,4.86L6.3,7.44L6.32,7.68C6.32,8.39 5.88,9 5.26,9.25L5.29,14.5L10.8,4.86M13.2,4.86L18.71,14.5L18.74,9.25C18.12,9 17.68,8.39 17.68,7.68L17.7,7.44L13.2,4.86Z" /></svg>
        </SvgIcon>,
        title:
          <TreeNodeLabel fixedAction action={<APIRootAction />}>
            <div>{t("UmlEditor.GraphqlAPIs")}</div>
          </TreeNodeLabel>,
        key: "3",
        children: getApiNodes()
      }]
    }
    return [
      modelNode,
      ...apiNodes,

    ]
  }, [getApiNodes, getMetaLogicNodes, getModelPackageNodes, getScriptLogicNodes, options?.supportCustomizedApi, t]);

  const handleSelect = useCallback((keys: string[]) => {
    for (const uuid of keys) {
      if (isDiagram(uuid)) {
        setSelecteDiagramId(uuid);
        setSelectedScriptId(undefined);
        setSelectGraphLogicId(undefined);
        setSelectCodeId(undefined);
        setSelectApiId(undefined);
      } else if (isScriptLogic(uuid)) {
        setSelecteDiagramId(undefined);
        setSelectedScriptId(uuid);
        setSelectGraphLogicId(undefined);
        setSelectCodeId(undefined);
        setSelectedElement(undefined);
        setSelectApiId(undefined);
      } else if (isGraphLogic(uuid)) {
        setSelecteDiagramId(undefined);
        setSelectedScriptId(undefined);
        setSelectGraphLogicId(uuid);
        setSelectCodeId(undefined);
        setSelectedElement(undefined);
        setSelectApiId(undefined);
      } else if (isElement(uuid)) {
        setSelectedElement(uuid);
        setSelectedScriptId(undefined);
        setSelectGraphLogicId(undefined);
        setSelectCodeId(undefined);
        setSelectApiId(undefined);
      } else if (isApi(uuid)) {
        setSelectedElement(undefined);
        setSelectedScriptId(undefined);
        setSelectGraphLogicId(undefined);
        setSelectCodeId(undefined);
        setSelectApiId(uuid);
      } else if(isCode(uuid)){
        setSelecteDiagramId(undefined);
        setSelectedScriptId(undefined);
        setSelectGraphLogicId(undefined);
        setSelectCodeId(uuid);
        setSelectedElement(undefined);
        setSelectApiId(undefined);
      }else {
        const relationUuid = parseRelationUuid(uuid);
        if (relationUuid) {
          setSelectedElement(relationUuid);
        }
      }
    }
  }, [isApi, isCode, isDiagram, isElement, isGraphLogic, isScriptLogic, parseRelationUuid, setSelectApiId, setSelectCodeId, setSelectGraphLogicId, setSelecteDiagramId, setSelectedElement, setSelectedScriptId])

  return (
    <Container>
      <StyledDirectoryTree
        defaultExpandedKeys={["0"]}
        selectedKeys={[selectedScriptId || selectedGraphLogicId || selectedCodeId || selectedApiId || selectedDiagramId] as any}
        onSelect={handleSelect as any}
        treeData={treeData}
      />
    </Container>
  );
});

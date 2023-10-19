/* eslint-disable @typescript-eslint/no-explicit-any */
import { memo, useCallback, useMemo, useState, } from "react";
import { Tree } from "antd";
import { DataNode } from "antd/es/tree";
import styled from "styled-components";
import { CodeOutlined } from "@ant-design/icons";
import { SvgIcon } from "@rxdrag/react-antd-shell";
import { GraphLogicRootAction } from "./GraphLogicRootAction";
import { ScriptLogicRootAction } from "./ScriptLogicRootAction";
import { TreeNodeLabel } from "@rxdrag/uml-editor/";
import { useTranslate } from "@rxdrag/react-locales";
import { ID } from "@rxdrag/shared";
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
  background-color: transparent;
`

export const LogicTree = memo(() => {
  const [selectedScriptId, setSelectedScriptId] = useState<ID>();
  const [selectedGraphLogicId, setSelectGraphLogicId] = useState<ID>();

  const t = useTranslate();

  // const getScriptLogicNodes = useGetScriptNodes()
  // const getMetaLogicNodes = useGetGraphNodes()


  const treeData: DataNode[] = useMemo(() => {
    const scriptNode: DataNode = {
      icon: <CodeOutlined />,
      title:
        <TreeNodeLabel fixedAction action={<ScriptLogicRootAction />}>
          <div>{t("LogicScripts")}</div>
        </TreeNodeLabel>,
      key: "1",
      //children: getScriptLogicNodes()
    }
    const graphLogicsNode: DataNode = {
      icon: <SvgIcon>
        <svg style={{ width: "16px", height: "16px" }} viewBox="0 0 1024 1024" fill="currentColor">
          <path d="M571.945277 122.592083 452.423113 122.592083c-49.502437 0-89.6406 40.139186-89.6406 89.6406 0 49.502437 40.139186 89.641623 89.6406 89.641623l119.521141 0c49.502437 0 89.641623-40.139186 89.641623-89.641623C661.585877 162.730245 621.446691 122.592083 571.945277 122.592083L571.945277 122.592083zM571.945277 242.113223 452.423113 242.113223c-16.434298 0-29.880541-13.446243-29.880541-29.880541 0-16.434298 13.446243-29.880541 29.880541-29.880541l119.521141 0c16.434298 0 29.880541 13.446243 29.880541 29.880541C601.824795 228.66698 588.379575 242.113223 571.945277 242.113223L571.945277 242.113223zM571.945277 421.395446 452.423113 421.395446c-49.502437 0-89.6406 40.139186-89.6406 89.6406 0 49.502437 40.139186 89.641623 89.6406 89.641623l119.521141 0c49.502437 0 89.641623-40.139186 89.641623-89.641623C661.585877 461.534632 621.446691 421.395446 571.945277 421.395446L571.945277 421.395446zM571.945277 540.916587 452.423113 540.916587c-16.434298 0-29.880541-13.446243-29.880541-29.880541 0-16.434298 13.446243-29.880541 29.880541-29.880541l119.521141 0c16.434298 0 29.880541 13.446243 29.880541 29.880541C601.824795 527.470343 588.379575 540.916587 571.945277 540.916587L571.945277 540.916587zM571.945277 720.198809 452.423113 720.198809c-49.502437 0-89.6406 40.139186-89.6406 89.6406s40.139186 89.6406 89.6406 89.6406l119.521141 0c49.502437 0 89.641623-40.139186 89.641623-89.6406S621.446691 720.198809 571.945277 720.198809L571.945277 720.198809zM571.945277 839.71995 452.423113 839.71995c-16.434298 0-29.880541-13.446243-29.880541-29.880541 0-16.434298 13.446243-29.880541 29.880541-29.880541l119.521141 0c16.434298 0 29.880541 13.446243 29.880541 29.880541C601.824795 826.273706 588.379575 839.71995 571.945277 839.71995L571.945277 839.71995zM243.261373 779.959891c-31.972179 0-61.951981-12.450567-84.561931-34.960233-22.509666-22.60995-34.960233-52.589752-34.960233-84.560908 0-31.972179 12.450567-61.951981 34.960233-84.561931 22.60995-22.60995 52.589752-34.960233 84.561931-34.960233l59.761082 0 0-59.761082-59.761082 0c-99.002828 0-179.282223 80.279395-179.282223 179.282223l0 0c0 99.002828 80.279395 179.282223 179.282223 179.282223l0 59.761082 89.6406-89.6406-89.6406-89.6406L243.261373 779.959891 243.261373 779.959891zM781.107017 182.352141l-59.761082 0 0 59.761082 59.761082 0c31.972179 0 61.951981 12.450567 84.560908 34.960233 22.60995 22.60995 34.960233 52.589752 34.960233 84.560908 0 31.972179-12.450567 61.951981-34.960233 84.561931-22.60995 22.509666-52.589752 34.960233-84.560908 34.960233l0-59.761082-89.6406 89.6406 89.6406 89.641623 0-59.761082c99.002828 0 179.282223-80.279395 179.282223-179.282223l0 0C960.38924 262.631536 880.110869 182.352141 781.107017 182.352141L781.107017 182.352141z"></path>
        </svg>
      </SvgIcon>,
      title:
        <TreeNodeLabel fixedAction action={<GraphLogicRootAction />}>
          <div>{t("GraphLogics")}</div>
        </TreeNodeLabel>,
      key: "2",
      //children: getMetaLogicNodes()
    }


    return [
      scriptNode,
      graphLogicsNode,
    ]
  }, [t]);

  const handleSelect = useCallback((keys: any[]) => {
    for (const id of keys) {
//
    }
  }, [])

  return (
    <Container>
      <StyledDirectoryTree
        defaultExpandedKeys={["0"]}
        selectedKeys={[selectedScriptId || selectedGraphLogicId] as any}
        onSelect={handleSelect }
        treeData={treeData}
      />
    </Container>
  );
});

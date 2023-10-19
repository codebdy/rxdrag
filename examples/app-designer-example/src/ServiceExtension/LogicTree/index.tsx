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
import { logicflowIcon } from "@rxdrag/react-shared";
import { useGetFlowNodes } from "./hooks/useGetFlowNodes";
import { useGetScriptNodes } from "./hooks/useGetScriptNodes";
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

  const getScriptLogicNodes = useGetScriptNodes()
  const getMetaLogicNodes = useGetFlowNodes()


  const treeData: DataNode[] = useMemo(() => {
    const scriptNode: DataNode = {
      icon: <CodeOutlined />,
      title:
        <TreeNodeLabel fixedAction action={<ScriptLogicRootAction />}>
          <div>{t("LogicScripts")}</div>
        </TreeNodeLabel>,
      key: "1",
      children: getScriptLogicNodes()
    }
    const graphLogicsNode: DataNode = {
      icon: <SvgIcon>
        {logicflowIcon}
      </SvgIcon>,
      title:
        <TreeNodeLabel fixedAction action={<GraphLogicRootAction />}>
          <div>{t("GraphLogics")}</div>
        </TreeNodeLabel>,
      key: "2",
      children: getMetaLogicNodes()
    }


    return [
      scriptNode,
      graphLogicsNode,
    ]
  }, [getMetaLogicNodes, getScriptLogicNodes, t]);

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
        onSelect={handleSelect}
        treeData={treeData}
      />
    </Container>
  );
});

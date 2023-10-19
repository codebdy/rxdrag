/* eslint-disable @typescript-eslint/no-explicit-any */
import { memo, useCallback, useMemo, } from "react";
import { Tree } from "antd";
import { DataNode, EventDataNode } from "antd/es/tree";
import styled from "styled-components";
import { CodeOutlined } from "@ant-design/icons";
import { SvgIcon } from "@rxdrag/react-antd-shell";
import { LogicFlowRootAction } from "./LogicFlowRootAction";
import { ScriptLogicRootAction } from "./ScriptLogicRootAction";
import { TreeNodeLabel } from "@rxdrag/uml-editor/";
import { useTranslate } from "@rxdrag/react-locales";
import { ID } from "@rxdrag/shared";
import { logicflowIcon } from "@rxdrag/react-shared";
import { useGetFlowNodes } from "./hooks/useGetFlowNodes";
import { useGetScriptNodes } from "./hooks/useGetScriptNodes";
import { ExtensionType } from "./types";
import { IExtensionLogicFlow } from "../../interfaces/extension";
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

export const LogicTree = memo((
  props: {
    selectedLogicFlow?: ID,
    selectedScript?: ID,
    onSelectLogicFlow?: (selectedLogicFlow?: ID) => void,
    onSelectScript?: (selectedScript?: ID) => void,
    flows?: IExtensionLogicFlow[]
  }
) => {
  const { selectedLogicFlow, selectedScript, onSelectLogicFlow, onSelectScript, flows } = props;
  const t = useTranslate();

  const getScriptLogicNodes = useGetScriptNodes()
  const getMetaLogicNodes = useGetFlowNodes(flows)


  const treeData: DataNode[] = useMemo(() => {
    const scriptNode: DataNode = {
      icon: <CodeOutlined />,
      title:
        <TreeNodeLabel fixedAction action={<ScriptLogicRootAction />}>
          <div>{t("LogicScripts")}</div>
        </TreeNodeLabel>,
      key: "scripts",
      selectable: false,
      children: getScriptLogicNodes()
    }
    const graphLogicsNode: DataNode = {
      icon: <SvgIcon>
        {logicflowIcon}
      </SvgIcon>,
      title:
        <TreeNodeLabel fixedAction action={<LogicFlowRootAction />}>
          <div>{t("GraphLogics")}</div>
        </TreeNodeLabel>,
      key: "logicflows",
      selectable: false,
      children: getMetaLogicNodes()
    }


    return [
      scriptNode,
      graphLogicsNode,
    ]
  }, [getMetaLogicNodes, getScriptLogicNodes, t]);

  const handleSelect = useCallback((keys: any[], info: { node: EventDataNode<any | DataNode> }) => {
    if (info?.node?.type === ExtensionType.script) {
      onSelectScript?.(info?.node?.key)
      onSelectLogicFlow?.(undefined)
    } else if (info?.node?.type === ExtensionType.logicflow) {
      onSelectLogicFlow?.(info?.node?.key)
      onSelectScript?.(undefined)
    }
  }, [onSelectLogicFlow, onSelectScript])

  return (
    <Container>
      <StyledDirectoryTree
        defaultExpandedKeys={["0"]}
        selectedKeys={[selectedLogicFlow || selectedScript || ""]}
        onSelect={handleSelect}
        treeData={treeData}
      />
    </Container>
  );
});

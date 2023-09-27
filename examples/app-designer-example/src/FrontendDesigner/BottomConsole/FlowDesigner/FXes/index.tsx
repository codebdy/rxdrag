import { Tree } from "antd";
import { DataNode, DirectoryTreeProps } from "antd/es/tree";
import { memo, useMemo } from "react"
import { TreeContainer } from "../../common/TreeContainer";
import { FunctionOutlined } from "@ant-design/icons";
import { RootCurrentLabel } from "./RootFrontLabel";
import { RootFrontLabel } from "./RootGlobalLabel";
import { useAppFrontend } from "../../../../hooks/useAppFrontend";
import { FrontFxLabel } from "./FrontFxLabel";

const { DirectoryTree } = Tree;

export const FXes = memo(() => {
  const frontend = useAppFrontend()
  const onSelect: DirectoryTreeProps['onSelect'] = (keys, info) => {
    console.log('Trigger Select', keys, info);
  };

  const treeData: DataNode[] = useMemo(() => [
    {
      title: <RootCurrentLabel />,
      key: 'current',
      children: frontend?.fxFlows?.map(fx => {
        return ({
          key: fx.id,
          title: <FrontFxLabel fx={fx} />,
          icon: <FunctionOutlined />,
        })
      }),
    },
    {
      title: <RootFrontLabel />,
      key: 'global',
      children: [
        { title: '子编排1', key: '0-1-0', icon: <FunctionOutlined />, isLeaf: true },
        { title: '子编排2', key: '0-1-1', icon: <FunctionOutlined />, isLeaf: true },
      ],
    },
  ], [frontend?.fxFlows]);

  return (
    <TreeContainer>
      <DirectoryTree
        onSelect={onSelect}
        treeData={treeData}
      />
    </TreeContainer>
  )
})
import { Tree } from "antd";
import { DataNode, DirectoryTreeProps } from "antd/es/tree";
import { memo, useCallback, useMemo } from "react"
import { TreeContainer } from "../../common/TreeContainer";
import { useModule } from "../../../hooks/useModule";
import { RootLabel } from "./RootLabel";
import { NodeIndexOutlined } from "@ant-design/icons";
import { ScriptLabel } from "./ScriptLabel";

const { DirectoryTree } = Tree;

export const Scripts = memo(() => {
  const module = useModule()
  const treeData: DataNode[] = useMemo(() => [
    {
      title: <RootLabel />,
      key: 'scripts',
      selectable: false,
      children: module?.scripts?.map(script => {
        return {
          key: script.id,
          title: <ScriptLabel script={script} />,
          icon: <NodeIndexOutlined />,
        }
      })
    },
  ], [module?.scripts]);


  const onSelect: DirectoryTreeProps['onSelect'] = useCallback((keys: React.Key[]) => {
    console.log('Trigger Select', keys);
  }, []);

  return (
    <>
      <TreeContainer>
        <DirectoryTree
          onSelect={onSelect}
          treeData={treeData}
        />
      </TreeContainer>
    </>
  )
})
import { Tree } from "antd";
import { DataNode, DirectoryTreeProps } from "antd/es/tree";
import { memo, useCallback, useMemo } from "react"
import { TreeContainer } from "../../common/TreeContainer";
import { useModule } from "../../../hooks/useModule";
import { RootLabel } from "./RootLabel";
import { NodeIndexOutlined } from "@ant-design/icons";
import { ScriptLabel } from "./ScriptLabel";
import { ID } from "@rxdrag/shared";
import { useQueryScripts } from "../../../../hooks/useQueryScripts";
import { LogicType } from "../../../../interfaces/flow";

const { DirectoryTree } = Tree;

export const Scripts = memo((
  props: {
    display?: boolean,
    onSelect: (id: ID) => void,
  }
) => {
  const { display, onSelect } = props;
  const module = useModule()
  const { scripts } = useQueryScripts(module?.id, LogicType.normal)
  const treeData: DataNode[] = useMemo(() => [
    {
      title: <RootLabel />,
      key: 'scripts',
      selectable: false,
      children: scripts?.map(script => {
        return {
          key: script.id,
          title: <ScriptLabel script={script} />,
          icon: <NodeIndexOutlined />,
          isLeaf: true,
        }
      })
    },
  ], [scripts]);


  const handleSelect: DirectoryTreeProps['onSelect'] = useCallback((keys: React.Key[]) => {
    onSelect?.((keys?.[0] as ID | undefined) || "")
  }, [onSelect]);

  return (
    <>
      <TreeContainer
        className={!display ? "hidden" : undefined}
      >
        <DirectoryTree
          onSelect={handleSelect}
          treeData={treeData}
        />
      </TreeContainer>
    </>
  )
})
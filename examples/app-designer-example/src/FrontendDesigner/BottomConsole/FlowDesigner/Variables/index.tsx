import { Tree } from "antd";
import { DataNode } from "antd/es/tree";
import { memo, useMemo } from "react"
import { useModule } from "../../../hooks/useModule";
import { TreeContainer } from "../../common/TreeContainer";
import { variableIcon, setPropIcon, listenPropIcon } from "../../icons";
import { RootVarsLabel } from "./RootVarsLabel";
import { VariableLabel } from "../Flows/VariableLabel";


const { DirectoryTree } = Tree;

export const Variables = memo((
  props: {
    display?: boolean,
  }
) => {
  const { display } = props;
  const module = useModule()

  const treeData: DataNode[] = useMemo(() => [

    {
      title: <RootVarsLabel />,
      key: 'vars',
      selectable: false,
      children: module?.variables?.map(variable => {
        return {
          key: variable.id,
          title: <VariableLabel variable={variable} />,
          selectable: false,
          icon: variableIcon,
          children: [
            {
              key: variable.name + "set",
              title: "设置",
              isLeaf: true,
              icon: setPropIcon,
              selectable: false,
            },
            {
              key: variable.name + "listen",
              title: "监听",
              isLeaf: true,
              icon: listenPropIcon,
              selectable: false,
            },
          ]
        }
      })
    }
  ], [module?.variables]);



  return (
    <TreeContainer
      className={!display ? "hidden" : undefined}
    >
      <DirectoryTree
        selectable={false}
        treeData={treeData}
      />
    </TreeContainer>
  )
})
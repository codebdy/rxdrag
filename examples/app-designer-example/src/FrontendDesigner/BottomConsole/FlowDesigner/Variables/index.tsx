import { Tree } from "antd";
import { DataNode } from "antd/es/tree";
import { memo, useMemo } from "react"
import { useModule } from "../../../hooks/useModule";
import { TreeContainer } from "../../common/TreeContainer";
import { RootVarsLabel } from "./RootVarsLabel";
import { VariableLabel } from "./VariableLabel";
import { ActivityResource } from "@rxdrag/minions-logicflow-editor";
import { IActivityMaterial } from "@rxdrag/minions-schema";
import { createId } from "@rxdrag/shared";
import { DraggableText } from "../DraggableText";
import { listenVariableMaterial, readVariableMaterial, setVariableMaterial } from "@rxdrag/minions-react-materials";
import { listenPropIcon, readPropIcon, setPropIcon, variableIcon } from "@rxdrag/react-shared";


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
              key: variable.id + "readVariable",
              title: <ActivityResource
                material={readVariableMaterial as IActivityMaterial<React.ReactNode>}
                createNode={() => {
                  return {
                    id: createId(),
                    label: variable.name || variable.id,
                    type: readVariableMaterial.activityType,
                    activityName: readVariableMaterial.activityName,
                    inPorts: [
                      {
                        id: createId(),
                        name: "input",
                        label: "$read",
                      },
                    ],
                    outPorts: [
                      {
                        id: createId(),
                        name: "output",
                        label: "",
                      },
                    ],
                    config: {
                      variable: variable.name
                    }
                  }
                }}
              >
                {
                  (onStartDrag) => {
                    return <DraggableText onMouseDown={onStartDrag}>
                      读取
                    </DraggableText>
                  }
                }
              </ActivityResource>,
              isLeaf: true,
              icon: readPropIcon
            },
            {
              key: variable.id + "setVariable",
              title: <ActivityResource
                material={setVariableMaterial as IActivityMaterial<React.ReactNode>}
                createNode={() => {
                  return {
                    id: createId(),
                    label: variable.name || variable.id,
                    type: setVariableMaterial.activityType,
                    activityName: setVariableMaterial.activityName,
                    inPorts: [
                      {
                        id: createId(),
                        name: "input",
                        label: "$setValue",
                      },
                    ],
                    outPorts: [
                      {
                        id: createId(),
                        name: "output",
                        label: "",
                      },
                    ],
                    config: {
                      variable: variable.name
                    }
                  }
                }}
              >
                {
                  (onStartDrag) => {
                    return <DraggableText onMouseDown={onStartDrag}>
                      赋值
                    </DraggableText>
                  }
                }
              </ActivityResource>,
              isLeaf: true,
              icon: setPropIcon
            },
            {
              key: variable.id + "listenVariable",
              title: <ActivityResource
                material={listenVariableMaterial as IActivityMaterial<React.ReactNode>}
                createNode={() => {
                  return {
                    id: createId(),
                    label: variable.name || variable.id,
                    type: listenVariableMaterial.activityType,
                    activityName: listenVariableMaterial.activityName,
                    outPorts: [
                      {
                        id: createId(),
                        name: "output",
                        label: "$valueChange",
                      },
                    ],
                    config: {
                      variable: variable.name
                    }
                  }
                }}
              >
                {
                  (onStartDrag) => {
                    return <DraggableText onMouseDown={onStartDrag}>
                      监听
                    </DraggableText>
                  }
                }
              </ActivityResource>,
              isLeaf: true,
              icon: listenPropIcon
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
import { ReactNode, memo } from "react"
import { Collapse as AntdCollapse } from "antd";
import styled from "styled-components";
import { ActivityResource, ToolItem, ToolItemCategory } from "@rxdrag/minions-logicflow-editor";
import { ActivityMaterialCategory } from "@rxdrag/minions-schema";

const Collapse = styled(AntdCollapse)`
  flex:1;
  border-radius: 0;
  overflow: auto;
`

const { Panel } = AntdCollapse;

export const Toolbox = memo((props: {
  materialCategories: ActivityMaterialCategory<ReactNode>[],
  addons?: React.ReactNode,
}) => {
  const { materialCategories, addons } = props;

  return (
    <Collapse defaultActiveKey={[materialCategories?.[0]?.name]} bordered={false} accordion expandIconPosition="end">
      {
        materialCategories.map(category => {
          return (
            <Panel key={category.name} header={category.name}>
              <ToolItemCategory>
                {
                  category.materials.map((materail, index) => {
                    return <ActivityResource key={index + materail.activityName} material={materail}>
                      {
                        (onStartDrag) => {
                          return <ToolItem
                            icon={materail.icon}
                            title={materail.label}
                            color={materail.color}
                            onMouseDown={onStartDrag}
                          />
                        }
                      }
                    </ActivityResource>
                  })
                }
              </ToolItemCategory>
            </Panel>
          )
        })
      }
      {addons}
    </Collapse>
  )
})
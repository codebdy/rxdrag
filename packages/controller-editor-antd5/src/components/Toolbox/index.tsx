import { ReactNode, memo } from "react"
import { Collapse as AntdCollapse } from "antd";
import styled from "styled-components";
import { ReactionResource, ToolItem, ToolItemCategory } from "@rxdrag/minions-logicflow-editor";
import { ActivityMaterialCategory } from "@rxdrag/minions-schema";
import { useTransMaterial } from "../../hooks";

const Collapse = styled(AntdCollapse)`
  flex:1;
  border-radius: 0;
  overflow: auto;
`

const { Panel } = AntdCollapse;

export const Toolbox = memo((props:{
  materialCategories:ActivityMaterialCategory<ReactNode>[] 
}) => {
  const {materialCategories} = props;
  const transMaterial = useTransMaterial()
  return (
    <Collapse defaultActiveKey={[materialCategories?.[0]?.name]} bordered={false} accordion expandIconPosition="end">
      {
        materialCategories.map(category => {
          return (
            <Panel key={category.name} header={category.name}>
              <ToolItemCategory>
                {
                  category.materials.map((materail, index) => {
                    return <ReactionResource key={index + materail.activityName} material={transMaterial(materail)}>
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
                    </ReactionResource>
                  })
                }
              </ToolItemCategory>
            </Panel>
          )
        })
      }
      {/* <Panel header={t('$componentControl')} key="componentControl">
        <ComponentList />
      </Panel> */}
    </Collapse>
  )
})
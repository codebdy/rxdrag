import { ReactNode, memo, useMemo } from "react"
import { Collapse as AntdCollapse, CollapseProps } from "antd";
import styled from "styled-components";
import { ActivityResource, ToolItem, ToolItemCategory } from "@rxdrag/minions-logicflow-editor";
import { ActivityMaterialCategory } from "@rxdrag/minions-schema";

const Collapse = styled(AntdCollapse)`
  flex:1;
  border-radius: 0;
  overflow: auto;
`

export const Toolbox = memo((props: {
  materialCategories: ActivityMaterialCategory<ReactNode>[]
}) => {
  const { materialCategories } = props;
  const items: CollapseProps['items'] = useMemo(() => materialCategories?.map(category => ({
    key: category.name,
    label: category.name,
    children: <ToolItemCategory>
      {
        category.materials.map((material, index) => {
          return <ActivityResource key={index + material.activityName} material={material}>
            {
              (onStartDrag) => {
                return <ToolItem
                  icon={material.icon}
                  title={material.label}
                  color={material.color}
                  onMouseDown={onStartDrag}
                />
              }
            }
          </ActivityResource>
        })
      }
    </ToolItemCategory>
  })), [materialCategories])
  return (
    <Collapse
      defaultActiveKey={[materialCategories?.[0]?.name]}
      bordered={false}
      accordion
      expandIconPosition="end"
      items = {items}
    >
    </Collapse>
  )
})
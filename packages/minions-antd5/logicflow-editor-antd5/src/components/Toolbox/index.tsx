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
  })), [])
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
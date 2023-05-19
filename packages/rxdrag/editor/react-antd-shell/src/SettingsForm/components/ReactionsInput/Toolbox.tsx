import { memo } from "react"
import { Collapse as AntdCollapse } from "antd";
import styled from "styled-components";
import { activityMaterialCategories } from "@rxdrag/minions-react-materials";
import { ReactionResource, ToolItem, ToolItemCategory } from "@rxdrag/minions-logicflow-editor";
import { useTrans } from "@rxdrag/controller-editor-antd5/src/hooks/useTrans";

const Collapse = styled(AntdCollapse)`
  flex:1;
  border-radius: 0;
  overflow: auto;
`

const { Panel } = AntdCollapse;

export const Toolbox = memo(() => {
  const t = useTrans()
  return (
    <Collapse defaultActiveKey={[activityMaterialCategories?.[0]?.name]} bordered={false} accordion expandIconPosition="end">
      {
        activityMaterialCategories.map(category => {
          return (
            <Panel key={category.name} header={t(category.name)}>
              <ToolItemCategory>
                {
                  category.materials.map((materail, index) => {
                    return <ReactionResource key={index + materail.activityName} material={materail}>
                      {
                        (onStartDrag) => {
                          return <ToolItem
                            icon={materail.icon}
                            title={t(materail.label)}
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
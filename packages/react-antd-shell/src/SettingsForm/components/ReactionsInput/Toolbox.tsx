import { memo } from "react"
import { Collapse as AntdCollapse, Row } from "antd";
import styled from "styled-components";
import { reactionMaterialCategories } from "@rxdrag/react-minions-materials";
import { ComponentList } from "./ComponentList";
import { ReactionResource, ToolItem, useTrans } from "@rxdrag/react-antd-minions-editor";

const Collapse = styled(AntdCollapse)`
  flex:1;
  border-radius: 0;
  overflow: auto;
`

const { Panel } = AntdCollapse;

export const Toolbox = memo(() => {
  const t = useTrans()
  return (
    <Collapse defaultActiveKey={[reactionMaterialCategories?.[0]?.name]} bordered={false} accordion expandIconPosition="end">
      {
        reactionMaterialCategories.map(category => {
          return (
            <Panel key={category.name} header={t(category.name)}>
              <Row gutter={8}>
                {
                  category.materials.map((reaction) => {
                    return <ReactionResource key={reaction.name} material={reaction}>
                      {
                        (onStartDrag) => {
                          return <ToolItem
                            icon={reaction.icon}
                            title={reaction.label}
                            color={reaction.color}
                            onMouseDown={onStartDrag}
                          />
                        }
                      }
                    </ReactionResource>
                  })
                }
              </Row>
            </Panel>
          )
        })
      }
      <Panel header={t('$componentControl')} key="componentControl">
        <ComponentList />
      </Panel>
    </Collapse>
  )
})
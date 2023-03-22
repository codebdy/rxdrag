import { Collapse as AntdCollapse, Row } from "antd";
import { memo, ReactNode } from "react";
import styled from "styled-components";
import { ToolItem } from "./ToolItem";
import { useTrans } from "../../hooks/useTrans";
import { useMaterialCategories } from "@rxdrag/react-minions";
import { ReactionResource } from "./ReactionResource"
const { Panel } = AntdCollapse;

const StyledToolbox = styled.div`
  user-select: none;
  width: 180px;
  border-right: ${props => props.theme.token?.colorBorder} solid 1px;
  height: 100%;
  display: flex;
  flex-flow: column;
`

const Collapse = styled(AntdCollapse)`
  flex:1;
  border-radius: 0;
  overflow: auto;
`

export const Toolbox = memo((props: {
  children?: ReactNode
}) => {
  const { children } = props
  const t = useTrans();
  const materialCategories = useMaterialCategories()

  return (
    <StyledToolbox>
      <Collapse defaultActiveKey={[materialCategories?.[0]?.name]} bordered={false} accordion expandIconPosition="end">
        {
          materialCategories.map(category => {
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
          {
            children
          }
        </Panel>
      </Collapse>
    </StyledToolbox >
  )
})
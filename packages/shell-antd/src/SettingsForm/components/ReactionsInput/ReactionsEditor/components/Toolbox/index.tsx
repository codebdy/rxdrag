import { Collapse as AntdCollapse, Row } from "antd";
import { memo, useCallback } from "react";
import styled from "styled-components";
import { useDnd } from "../../hooks/useDnd";
import { useGetNodeConfig } from "../../hooks/useGetNodeConfig";
import { ToolItem } from "./ToolItem";
import { IReactionMeta } from "runner/minions/interfaces/metas";
import { createUuid } from "../../utils";
import { IReactionMaterial } from "runner/minions/interfaces/material";
import { useTrans } from "../../hooks/useTrans";
import { ComponentList } from "./ComponentList";
import { reactionMaterialCategories } from "react-shells/ant5/materials";
import { useGraph } from "../../hooks/useGraph";
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
}) => {
  const t = useTrans();
  const graph = useGraph()
  const dnd = useDnd()
  const getNodeConfig = useGetNodeConfig()

  const startDragFn = useCallback((marterial: IReactionMaterial) => {
    return (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (!graph) {
        return;
      }
      const nodeMeta: IReactionMeta = {
        id: createUuid(),
        label: t(marterial.label),
        type: marterial.reactionType,
        materialName: marterial.name,
        ...marterial.meta
      }
      const node = graph.createNode(getNodeConfig(nodeMeta));
      dnd?.start(node, e.nativeEvent as any);
    };
  }, [dnd, getNodeConfig, graph, t])

  return (
    <StyledToolbox>
      <Collapse defaultActiveKey={[reactionMaterialCategories?.[0].name]} bordered={false} accordion expandIconPosition="end">
        {
          reactionMaterialCategories.map(category => {
            return (
              <Panel key={category.name} header={t(category.name)}>
                <Row gutter={8}>
                  {
                    category.materials.map((reaction) => {
                      return (<ToolItem
                        key={reaction.name}
                        icon={reaction.icon}
                        title={reaction.label}
                        color={reaction.color}
                        onMouseDown={startDragFn(reaction)}
                      />)
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
    </StyledToolbox>
  )
})
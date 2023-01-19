import { Collapse as AntdCollapse, Row } from "antd";
import { useToolsTranslate } from "core-react/hooks/useToolsTranslate";
import { memo, useCallback } from "react";
import styled from "styled-components";
import { useDnd } from "../../hooks/useDnd";
import { useEditorState } from "../../hooks/useEditorState";
import { useGetNodeConfig } from "../../hooks/useGetNodeConfig";
import { fieldIcon, fieldReadIcon, fieldValidateIcon, formIcon, formReadIcon, formValidateIcon, infoIcon, jsIcon, loadingIcon, routeIcon, simulateIcon, subscribIcon } from "../../../../../../icons/reactions";
import { ComponentReactions } from "./ComponentReactions";
import { ToolItem } from "./ToolItem";
import { basicReactions } from "react-shells/ant5/materials/basic";
import { IReactionNodeMeta } from "runner/reaction/interfaces/metas";
import { createUuid } from "../../utils";
import { IReactionMaterial } from "runner/reaction/interfaces/marerial";
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

export const Toolbox = memo(() => {
  const t = useToolsTranslate()
  const { graph } = useEditorState()
  const dnd = useDnd()
  const getNodeConfig = useGetNodeConfig()

  const startDragFn = useCallback((marterial: IReactionMaterial) => {
    return (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (!graph) {
        return;
      }
      const nodeMeta: IReactionNodeMeta = {
        uuid: createUuid(),
        label: "输入项",
        type: marterial.reactionType,
      }
      const node = graph.createNode(getNodeConfig(nodeMeta));
      dnd?.start(node, e.nativeEvent as any);
    };
  }, [dnd, getNodeConfig, graph])

  return (
    <StyledToolbox>
      <Collapse defaultActiveKey={['1']} bordered={false} accordion>
        <Panel header={t('ReactionsInput.basicReactions')} key="1">
          <Row gutter={8}>
            {
              basicReactions.map((reaction) => {
                return (<ToolItem
                  key={reaction.name}
                  icon={reaction.icon}
                  title={reaction.title}
                  color={reaction.color}
                  onMouseDown={startDragFn(reaction)}
                />)
              })
            }
          </Row>
        </Panel>
        <Panel header={t('ReactionsInput.commonReactions')} key="2">
          <Row gutter={8}>
            <ToolItem icon={routeIcon} title="路由跳转" />
            <ToolItem icon={infoIcon} title="提示消息" />
            <ToolItem icon={simulateIcon} title="数据模拟" />
            <ToolItem icon={loadingIcon} title="全局Loading" />
            <ToolItem icon={jsIcon} title="自定义代码" />
          </Row>
        </Panel>
        <Panel header={t('ReactionsInput.dataModel')} key="3">
          <Row gutter={8}>
            <ToolItem icon={formIcon} title="表单赋值" />
            <ToolItem icon={formValidateIcon} title="表单校验" />
            <ToolItem icon={formReadIcon} title="表单取值" />
            <ToolItem icon={fieldIcon} title="字段赋值" />
            <ToolItem icon={fieldValidateIcon} title="字段校验" />
            <ToolItem icon={fieldReadIcon} title="字段取值" />
            <ToolItem icon={subscribIcon} title="订阅变化" />
          </Row>
        </Panel>
      </Collapse>
      <ComponentReactions />
    </StyledToolbox>
  )
})
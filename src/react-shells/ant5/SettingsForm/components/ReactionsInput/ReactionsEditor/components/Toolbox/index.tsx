import { Collapse as AntdCollapse, Row } from "antd";
import { useToolsTranslate } from "core-react/hooks/useToolsTranslate";
import { memo } from "react";
import { IStartNodeMeta } from "runner/reaction/metas";
import styled from "styled-components";
import { useDnd } from "../../hooks/useDnd";
import { useEditorState } from "../../hooks/useEditorState";
import { useGetStartNodeConfig } from "../../hooks/useGetStartNodeConfig";
import { delayIcon, endIcon, fieldIcon, fieldReadIcon, fieldValidateIcon, formIcon, formReadIcon, formValidateIcon, ifIcon, infoIcon, jsIcon, loadingIcon, loopIcon, mergeIcon, randomIcon, routeIcon, simulateIcon, startIcon, subscribIcon, switchIcon } from "../../icons";
import { createUuid } from "../../utils";
import { ComponentReactions } from "./ComponentReactions";
import { ToolItem } from "./ToolItem";
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
  const getStartNodeConfig = useGetStartNodeConfig()

  const startDragFn = () => {
    return (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (!graph) {
        return;
      }
      const nodeMeta: IStartNodeMeta = {
        uuid: createUuid(),
        name: "input",
        label: "输入项",
      }
      const node = graph.createNode(getStartNodeConfig(nodeMeta));
      dnd?.start(node, e.nativeEvent as any);
    };
  };

  return (
    <StyledToolbox>
      <Collapse defaultActiveKey={['1']} bordered={false} accordion>
        <Panel header={t('ReactionsInput.basicReactions')} key="1">
          <Row gutter={8}>
            <ToolItem icon={startIcon} title="开始" onMouseDown={startDragFn()} />
            <ToolItem icon={endIcon} title="结束" />
            <ToolItem icon={ifIcon} title="条件" />
            <ToolItem icon={loopIcon} title="循环" />
            <ToolItem icon={mergeIcon} title="合并" />
            <ToolItem icon={switchIcon} title="分流" />
            <ToolItem icon={delayIcon} title="延时" />
            <ToolItem icon={randomIcon} title="随机数" />
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
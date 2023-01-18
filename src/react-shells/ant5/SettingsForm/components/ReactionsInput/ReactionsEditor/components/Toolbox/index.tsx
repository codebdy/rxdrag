import { Collapse as AntdCollapse, Row } from "antd";
import { useToolsTranslate } from "core-react/hooks/useToolsTranslate";
import { memo } from "react";
import styled from "styled-components";
import { delayIcon, endIcon, ifIcon, infoIcon, loadingIcon, loopIcon, mergeIcon, randomIcon, routeIcon, simulateIcon, startIcon, switchIcon } from "../../icons";
import { ToolItem } from "./ToolItem";
const { Panel } = AntdCollapse;

const StyledToolbox = styled.div`
  user-select: none;
  width: 180px;
  border-right: ${props => props.theme.token?.colorBorder} solid 1px;
  height: 100%;
  overflow: auto;
`

const Collapse = styled(AntdCollapse)`
  border-radius: 0;
`

export const Toolbox = memo(() => {
  const t = useToolsTranslate()

  return (
    <StyledToolbox>
      <Collapse defaultActiveKey={['1']} bordered={false} accordion>
        <Panel header={t('ReactionsInput.basicReactions')} key="1">
          <Row gutter={8}>
            <ToolItem icon={startIcon} title="开始" />
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
          </Row>
        </Panel>
        <Panel header={t('ReactionsInput.componentControl')} key="3">
          <p>选择组件</p>
        </Panel>
      </Collapse>
    </StyledToolbox>
  )
})
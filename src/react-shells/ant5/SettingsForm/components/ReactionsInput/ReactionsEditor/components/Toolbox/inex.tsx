import { Collapse as AntdCollapse } from "antd";
import { memo } from "react";
import styled from "styled-components";
const { Panel } = AntdCollapse;

const StyledToolbox = styled.div`
  width: 160px;
  border-right: ${props => props.theme.token?.colorBorder} solid 1px;
`

const Collapse = styled(AntdCollapse)`
  border-radius: 0;
`

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

export const Toolbox = memo(() => {
  return (
    <StyledToolbox>
      <Collapse defaultActiveKey={['1']} bordered = {false}>
        <Panel header="基础元件" key="1">
          <p>{text}</p>
        </Panel>
        <Panel header="通用计算" key="2">
          <p>{text}</p>
        </Panel>
        <Panel header="组件控制" key="3">
          <p>{text}</p>
        </Panel>
      </Collapse>
    </StyledToolbox>
  )
})
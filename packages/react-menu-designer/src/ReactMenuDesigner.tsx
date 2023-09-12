import React, { memo } from 'react';

import { SortableTree } from './components/SortableTree';
import styled from 'styled-components';
import { Toolbox } from './components/Toolbox';
import { PropertyPanel } from './components/PropertyPanel';
import { Button, Divider, Space } from 'antd';
import { DeleteOutlined, RedoOutlined, SaveOutlined, UndoOutlined } from '@ant-design/icons';

const Shell = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  flex-flow: column;
  background-color: ${props => props.theme.token?.colorBorderSecondary};
  align-items: center;
  box-sizing: border-box;
  padding: 16px;
`

const CanvasContainer = styled.div`
  flex: 1;
  user-select: none;
  padding: 0;
  max-width: 600px;
  width: 500px;
  box-sizing: border-box;
  background-color: ${props => props.theme.token?.colorBgContainer};
  height: 0;
  display: flex;
  flex-flow: column;
  border-radius: 8px;
  overflow: hidden;
`

const Canvas = styled.div`
  width: 100%;
  overflow: auto;
  box-sizing: border-box;
`

const Toolbar = styled.div`
  height: 48px;
  display: flex;
  align-items: center;
  border-bottom: solid 1px ${props => props.theme.token?.colorBorder};
  flex-shrink: 0;
  padding: 0 16px;
  justify-content: space-between;
  background-color: ${props => props.theme.token?.colorBgBase};
`

export const ReactMenuDesigner = memo(() => (
  <Shell>
    <Toolbox ></Toolbox>
    <CanvasContainer>
      <Toolbar>
        <Space>
          <Button type="text" icon={<UndoOutlined />} />
          <Button type="text" icon={<RedoOutlined />} />
          <Divider type='vertical' />
          <Button type="text" icon={<DeleteOutlined />} />
        </Space>
        <Button type="primary" >保存</Button>
      </Toolbar>
      <Canvas>
        <SortableTree collapsible indicator removable />
      </Canvas>
    </CanvasContainer>
    <PropertyPanel></PropertyPanel>
  </Shell>
));

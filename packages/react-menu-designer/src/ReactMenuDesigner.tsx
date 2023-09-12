import React, { memo } from 'react';

import { SortableTree } from './components/SortableTree';
import styled from 'styled-components';
import { Toolbox } from './components/Toolbox';
import { PropertyPanel } from './components/PropertyPanel';

const Shell = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  flex-flow: column;
  background-color: ${props => props.theme.token?.colorBorderSecondary};
`

const ScrollContainer = styled.div`
  flex: 1;
  overflow: auto;
  user-select: none;
  padding: 16px;
`

const Canvas = styled.div`
  max-width: 600px;
  padding: 8px;
  margin: 0 auto;
  background-color: ${props => props.theme.token?.colorBgContainer};
  border-radius: 5px;
  min-height: calc(100% - 16px);
`

export const ReactMenuDesigner = memo(() => (
  <Shell>
    <ScrollContainer>
      <Toolbox ></Toolbox>
      <Canvas>
        <SortableTree collapsible indicator removable />
      </Canvas>
      <PropertyPanel></PropertyPanel>
    </ScrollContainer>
  </Shell>
));

import React, { memo } from 'react';

import { SortableTree } from './SortableTree';
import styled from 'styled-components';

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
  min-height: calc(100% - 40px);
`

export const ReactMenuDesigner = memo(() => (
  <Shell>
    <ScrollContainer>
      <Canvas>
        <SortableTree collapsible indicator removable />
      </Canvas>
    </ScrollContainer>
  </Shell>
));

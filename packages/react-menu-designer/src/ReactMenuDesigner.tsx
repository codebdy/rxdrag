import React, { memo } from 'react';

import { SortableTree } from './SortableTree';

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      maxWidth: 600,
      padding: 10,
      margin: '0 auto',
      marginTop: '16px',
    }}
  >
    {children}
  </div>
);

export const ReactMenuDesigner = memo(() => (
  <Wrapper>
    <SortableTree collapsible indicator removable />
  </Wrapper>
));

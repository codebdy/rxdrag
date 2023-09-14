import { memo } from 'react';
import { ReactMenuDesignerInner } from './ReactMenuDesignerInner';
import { DesignerRoot } from './DesignerRoot';

export const ReactMenuDesigner = memo(() => {

  return (
    <DesignerRoot>
      <ReactMenuDesignerInner />
    </DesignerRoot>
  )
})


import { memo } from 'react';
import { ReactMenuDesignerInner } from './ReactMenuDesignerInner';
import { DesignerRoot } from './DesignerRoot';
import MenuDragRoot from './MenuDragRoot';

export const ReactMenuDesigner = memo(() => {

  return (
    <DesignerRoot>
      <MenuDragRoot>
        <ReactMenuDesignerInner />
      </MenuDragRoot>
    </DesignerRoot>
  )
})


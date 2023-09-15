import { memo } from 'react';
import { ReactMenuDesignerInner, ReactMenuDesignerInnerProps } from './ReactMenuDesignerInner';
import { DesignerRoot } from './DesignerRoot';
import { IMenuItem } from './interfaces';

export type ReactMenuDesignerProps = ReactMenuDesignerInnerProps & {
  defaultValue?: IMenuItem[],
  value?: IMenuItem[],
}

export const ReactMenuDesigner = memo((
  props: ReactMenuDesignerProps
) => {
  const { defaultValue, value, ...rest } = props
  return (
    <DesignerRoot defaultValue={defaultValue} value={value}>
      <ReactMenuDesignerInner {...rest} />
    </DesignerRoot>
  )
})


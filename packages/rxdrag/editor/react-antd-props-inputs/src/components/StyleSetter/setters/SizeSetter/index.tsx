import { useMemo } from 'react';
import { useCurrentNode, useDesignerEngine } from '@rxdrag/react-core';
//import { RXID_ATTR_NAME } from '@rxdrag/core';
import { UnitField } from '../../components';
import { StyleChangeListener } from '../../types';

export const SizeSetter = (props: {
  type: 'width' | 'height';
  value?: any;
  onChange?: StyleChangeListener;
}) => {
  const { onChange, value, type = 'width', ...other } = props;
  const engine = useDesignerEngine();
  const node = useCurrentNode();

  //const { [RXID_ATTR_NAME]: tsId } = node?.rxProps ?? {};

  // const placeholder = useMemo(() => {
  //   if (tsId) {
  //     const element = engine
  //       ?.getShell()
  //       .getElement(tsId)
  //       ?.getBoundingClientRect();
  //     return element?.[type] + '';
  //   }
  //   return undefined;
  // }, [engine, tsId, type]);

  const label = useMemo(() => {
    if (type === 'width') return '宽度';
    if (type === 'height') return '高度';
    return null;
  }, [type]);

  return (
    <UnitField
      label={label}
      type={type}
      value={value}
      onChange={onChange}
      underline
      //placeholder={placeholder}
      {...other}
    />
  );
};

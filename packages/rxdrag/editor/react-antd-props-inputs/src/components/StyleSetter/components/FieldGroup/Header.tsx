import { useMemo } from 'react';
import { CaretRightFilled } from '@ant-design/icons';

import { Field } from '../Field';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Header = (props:any) => {
  const { title, isActive, extra } = props;

  const Label = useMemo(() => {
    return (
      <>
        {isActive ? (
          <CaretRightFilled style={{ transform: 'rotate(90deg)' }} />
        ) : (
          <CaretRightFilled />
        )}
        <span style={{ marginLeft: '4px' }}>{title}</span>
      </>
    );
  }, [isActive, title]);

  return (
    <Field
      label={Label}
      contentStyle={{ marginLeft: '8px', marginRight: '8px' }}
      extra={extra}
    />
  );
};

import { useMemo } from 'react';
import { CaretRightFilled } from '@ant-design/icons';

import { Field } from '../Field';

export const Header = props => {
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

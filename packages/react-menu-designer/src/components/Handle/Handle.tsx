import React, { forwardRef } from 'react';

import { Button } from 'antd';
import { HolderOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const MoveableButton = styled(Button)`
  cursor: grab;
`

export const Handle = forwardRef<HTMLButtonElement>(
  (props, ref) => {
    return (
      <MoveableButton
        ref={ref}
        type="text"
        {...props}
        icon={
          <HolderOutlined />
        }
      />
    );
  }
);

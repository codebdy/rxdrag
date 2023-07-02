import { useEffect, useCallback } from 'react';
import { Row, Col, InputNumber, Tooltip } from 'antd';
import { isNil } from 'lodash';
import cx from 'classnames';

import { FoldIcon } from '../../../Fold';
import { Field } from '../Field';
import type { RadioItem } from '../../types';

const percentFormatter = (value: string | number | undefined) => {
  if (value === undefined) return '';
  return `${String(value).replace('%', '')}%`;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Positions = (props:any) => {
  const { value, onChange, options } = props;

  const handleItemClick = useCallback(
    (option: RadioItem) => {
      const { data } = option;
      const { left, top } = data as {
        left: string | number;
        top: string | number;
      };
      onChange('backgroundPosition', `${left},${top}`);
    },
    [onChange]
  );

  const getIconClass = useCallback(
    (option: RadioItem) => {
      return cx('position-icon', {
        actived:
          parseInt(option.data?.left) ===
            parseInt(value?.backgroundPositionX) &&
          parseInt(option.data?.top) === parseInt(value?.backgroundPositionY)
      });
    },
    [value?.backgroundPositionX, value?.backgroundPositionY]
  );

  useEffect(() => {
    // 设置初始化默认值
    if (
      isNil(value?.backgroundPositionX) &&
      isNil(value?.backgroundPositionX)
    ) {
      onChange('backgroundPosition', `${0},${0}`);
    }
  }, [onChange, value?.backgroundPositionX, value?.backgroundPositionY]);

  return (
    <div className="positon-style-container">
      <Row className="positon-style-container-left">
        {options.map((option: RadioItem) => {
          return (
            <Col key={option.value} span={8}>
              <Tooltip title={option.tips}>
                <FoldIcon
                  icon={option.icon}
                  className={getIconClass(option)}
                  onClick={() => handleItemClick(option)}
                />
              </Tooltip>
            </Col>
          );
        })}
      </Row>
      <div className="positon-style-container-right">
        <Field
          label="left"
          size="small"
          extra={
            <InputNumber
              value={value?.backgroundPositionX}
              formatter={percentFormatter}
              onChange={value => onChange('backgroundPositionX', value)}
            />
          }
        />
        <Field
          size="small"
          label="top"
          extra={
            <InputNumber
              value={value?.backgroundPositionY}
              formatter={percentFormatter}
              onChange={value => onChange('backgroundPositionY', value)}
            />
          }
        />
      </div>
    </div>
  );
};

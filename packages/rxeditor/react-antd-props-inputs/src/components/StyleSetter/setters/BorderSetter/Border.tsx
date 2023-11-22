/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback } from 'react';
import { Row, Col, Tooltip, Select } from 'antd';
import cx from 'classnames';

import { FoldIcon } from '../../../Fold';
import { Field, UnitField, ColorField } from '../../components';
import { borders, borderStyles } from './config';
import { RadioItem, StyleChangeListener } from '../../types';

export const Border = (props: {
  value: any;
  onChange: (key: string, value: any) => any;
}) => {
  const { value, onChange } = props;

  const [activeBorder, setActiveBorder] = useState('border');
  const handleBorderClick = (border: RadioItem) => {
    setActiveBorder(border.value);
    onChange('borderType', border.value);
  };

  const buildborderClass = useCallback(
    (border: RadioItem) => {
      return cx('border-icon', {
        active: border.value === activeBorder
      });
    },
    [activeBorder]
  );

  const handleColorChange = useCallback(
    (type: string, color: string) => {
      onChange(type, color);
    },
    [onChange]
  );

  const handleWidthChange: StyleChangeListener = useCallback(
    (styleKey, value) => {
      onChange(styleKey, value);
    },
    [onChange]
  );

  return (
    <div className="border-layout-container">
      <Row className="border-layout">
        {borders.map(border => (
          <Col key={border.value} {...(border.data || {})}>
            <Tooltip title={border.tips}>
              <FoldIcon
                className={buildborderClass(border)}
                icon={border.icon}
                onClick={() => handleBorderClick(border)}
              />
            </Tooltip>
          </Col>
        ))}
      </Row>
      {activeBorder && (
        <div className="border-layout-content" key={activeBorder}>
          <Field
            label="形状"
            size="small"
            style={{ marginBottom: '4px' }}
            extra={
              <Select
                style={{ width: '100%' }}
                placeholder="请选择"
                value={value?.[`${activeBorder}Style`]}
                onChange={value => onChange(`${activeBorder}Style`, value)}
                options={borderStyles.options.map(option => ({
                  label: option.label,
                  value: option.value
                }))}
              />
            }
          />
          <UnitField
            size="small"
            value={value?.[`${activeBorder}Width`]}
            type={`${activeBorder}Width`}
            units={[{ label: 'px', value: 'px' }]}
            label="线宽"
            onChange={handleWidthChange}
          />
          <ColorField
            label="颜色"
            type={`${activeBorder}Color`}
            value={value?.[`${activeBorder}Color`]}
            onChange={handleColorChange}
          />
        </div>
      )}
    </div>
  );
};

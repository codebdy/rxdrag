import React, { useMemo, useCallback } from 'react';
import { InputNumber, Select } from 'antd';
import { isNil } from 'lodash';

import { Field } from '../Field';
import { StyleChangeListener } from '../../types';

const Option = Select.Option;

export const defaultUnits = [
  {
    label: 'px',
    value: 'px'
  },
  {
    label: '%',
    value: '%'
  },
  {
    label: 'auto',
    value: 'auto'
  }
];

type Unit = {
  label: string;
  value: any;
};

export const UnitField = (props: {
  value?: any;
  label: string | React.ReactNode;
  type: string;
  size?: 'middle' | 'small';
  underline?: boolean;
  placeholder?: string;
  units?: Unit[];
  defaultUnit?: string;
  onChange?: StyleChangeListener;
  style?: React.CSSProperties;
}) => {
  const {
    label,
    value,
    onChange,
    type,
    style,
    size,
    placeholder,
    units = defaultUnits,
    defaultUnit = 'px',
    underline = false,
    ...other
  } = props;

  // 根据外部参数解析生成单位
  // 16px => px
  // 59% => %
  const getUnitByValue = useCallback(
    (value?: string, defaultValue = 'px') => {
      if (value === undefined) return defaultValue;
      for (const unit of units) {
        if (!isNil(unit.value) && value.endsWith(unit.value)) return unit.value;
      }
      return defaultValue;
    },
    [units]
  );

  // 根据 value 拆分数据单位（unit）
  // value 是一个带单位的数值：100px, 100%
  const unit = useMemo(() => {
    return getUnitByValue(value);
  }, [getUnitByValue, value]);

  // 拆分数值
  // 16px => 16, 20% => 20, auto: undefined
  const inputValue = useMemo(() => {
    const initialInputValue = parseInt(value || '');
    return isNaN(initialInputValue) ? undefined : initialInputValue;
  }, [value]);

  const handleChange = useCallback(
    (value: any) => {
      onChange?.(type, isNil(value) ? undefined : `${value}${unit}`);
    },
    [onChange, unit, type]
  );

  const handleUnitChange = useCallback(
    (value: string | null | undefined) => {
      if (value === 'auto') {
        onChange?.(type, 'auto');
      } else if (!isNil(value)) {
        onChange?.(
          type,
          inputValue === undefined ? undefined : `${inputValue}${value}`
        );
      } else {
        onChange?.(type, undefined);
      }
    },
    [type, onChange, inputValue]
  );

  const selectAfter = useMemo(
    () => (
      <Select
        value={unit}
        defaultValue={defaultUnit}
        onChange={handleUnitChange}
        style={{ width: 72 }}
      >
        {units.map(unit => (
          <Option key={unit.value || unit.label} value={unit.value}>
            {unit.label}
          </Option>
        ))}
      </Select>
    ),
    [units, unit, defaultUnit, handleUnitChange]
  );

  return (
    <Field
      label={label}
      underline={underline}
      size={size}
      extra={
        <InputNumber
          placeholder={placeholder}
          value={inputValue}
          onChange={handleChange}
          addonAfter={selectAfter}
          style={style}
          {...other}
        />
      }
    ></Field>
  );
};

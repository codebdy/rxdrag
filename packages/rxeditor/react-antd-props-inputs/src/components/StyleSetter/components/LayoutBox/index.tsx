/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useMemo } from 'react';
import { Select } from 'antd';
import { isNil } from 'lodash';
import { useToken } from 'antd/es/theme/internal';
import { Field } from '../Field';
import { Header } from './Header';
import { FieldGroup } from '../FieldGroup';
import { marginSchema, paddingSchema, defaultOptions } from './consts';
import { StyleChangeListener } from '../../types';

export type SelectValue = string | number | undefined;
export interface LayoutBoxProps {
  type: 'margin' | 'padding';
  value: any;
  onChange: StyleChangeListener;
}

export const LayoutBox = (props: LayoutBoxProps) => {
  const { type, onChange, value } = props;
  const [, token] = useToken();
  const schema =
    type === 'margin' ? marginSchema : type === 'padding' ? paddingSchema : [];

  const handleChange = useCallback(
    (key: string, value: SelectValue) => {
      const nextValue = value === 'default' ? undefined : value;
      onChange?.(key, nextValue);
    },
    [onChange]
  );

  const groupTitle = useMemo(() => {
    return (
      <span style={!isNil(value?.[type]) ? { color: token.colorPrimary } : {}}>
        {type}
      </span>
    );
  }, [value, type, token.colorPrimary]);

  return (
    <FieldGroup
      title={groupTitle}
      extra={
        <Header
          value={value?.[type]}
          onChange={(value: SelectValue) => handleChange(type, value)}
        />
      }
      className="rx-layout-field"
    >
      {schema.map(d => (
        <Field
          label={d.label}
          active={!isNil(value?.[d.key])}
          key={d.key}
          underline={false}
          extra={
            <Select
              style={{ width: '100%' }}
              placeholder="默认"
              value={value?.[d.key]}
              onChange={value => handleChange(d.key, value)}
              dropdownRender={menu => <>{menu}</>}
              options={defaultOptions.map(option => ({
                label: option.label,
                value: option.value
              }))}
            />
          }
        ></Field>
      ))}
    </FieldGroup>
  );
};

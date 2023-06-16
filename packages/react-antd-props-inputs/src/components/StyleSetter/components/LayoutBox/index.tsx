import { useCallback } from 'react';
import { Select } from 'antd';
import { Field } from '../Field';
import { Header } from './Header';
import { marginSchema, paddingSchema, defaultOptions } from './consts';
import { StyleChangeListener } from '../../types';
import { FieldGroup } from '../FieldGroup';

type SelectValue = string | number | undefined;
interface LayoutBoxProps {
  type: 'margin' | 'padding';
  value: any;
  onChange: StyleChangeListener;
}

export const LayoutBox = (props: LayoutBoxProps) => {
  const { type, onChange, value } = props;
  const schema =
    type === 'margin' ? marginSchema : type === 'padding' ? paddingSchema : [];

  const handleChange = useCallback(
    (key: string, value: SelectValue) => {
      const nextValue = value === 'default' ? undefined : value;
      onChange?.(key, nextValue);
    },
    [onChange]
  );

  // TODO：自定义输入
  return (
    <FieldGroup
      title={type}
      extra={
        <Header
          value={value?.[type]}
          onChange={(value: SelectValue) => handleChange(type, value)}
        />
      }
      className="ts-layout-field"
    >
      {schema.map(d => (
        <Field
          label={d.label}
          key={d.key}
          underline={false}
          extra={
            <Select
              style={{ width: '100%' }}
              placeholder="默认"
              value={value?.[d.key]}
              onChange={value => handleChange(d.key, value)}
              dropdownRender={menu => (
                <>
                  {menu}
                  {/* <Divider style={{ d: '8px 0' }} />
                <Space style={{ padding: '0 8px 4px' }}>
                  <Input
                    placeholder="Please enter item"
                    ref={inputRef}
                    value={name}
                    onChange={onNameChange}
                  />
                  <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                    Add item
                  </Button>
                </Space> */}
                </>
              )}
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

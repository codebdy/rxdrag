import { useCallback } from 'react';
import { InputNumber } from 'antd';
import { Field } from '../../components';

export const OpacitySetter = (props: {
  value?: number;
  onStyleChange?: (key: string, value: number) => void;
}) => {
  const { onStyleChange, value = 1 } = props;

  const handleChange = useCallback(
    (value: any) => {
      console.log('value', value);
      onStyleChange?.('opacity', value / 100);
    },
    [onStyleChange]
  );

  return (
    <Field
      label={'不透明度'}
      extra={
        <InputNumber
          placeholder="请输入"
          value={value * 100}
          min={0}
          max={100}
          onChange={handleChange}
          addonAfter="%"
        />
      }
    ></Field>
  );
};

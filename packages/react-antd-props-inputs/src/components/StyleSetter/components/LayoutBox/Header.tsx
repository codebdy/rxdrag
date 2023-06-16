import { useCallback, useState } from 'react';
import { Select, InputNumber, Divider } from 'antd';
import { isNil } from 'lodash';

import { defaultOptions } from './consts';

export type ValueType = string | number | null;
export interface LayoutHeaderProps {
  value: any;
  onChange: (value: any) => void;
}

export const Header = (props: LayoutHeaderProps) => {
  const { onChange, value } = props;
  const [inputValue, setInputValue] = useState<ValueType>();

  const handlePrevent = (evt: React.SyntheticEvent) => {
    evt.stopPropagation();
    return false;
  };

  const handleChange = useCallback((value: any) => {
    setInputValue(undefined);
    onChange(value);
  }, []);

  // 自定义输入
  const handleCustomInput = useCallback(
    (value: ValueType) => {
      setInputValue(value);
      // 默认支持 px
      onChange(isNil(value) ? undefined : `${value}px`);
    },
    [onChange]
  );

  return (
    <Select
      style={{ width: '100%' }}
      placeholder="默认"
      onClick={handlePrevent}
      value={value}
      onChange={handleChange}
      dropdownRender={menu => (
        <>
          {menu}
          <Divider style={{ margin: '8px 0' }} />
          <InputNumber
            addonAfter="px"
            value={inputValue}
            onChange={handleCustomInput}
            placeholder="请输入"
          />
        </>
      )}
      options={defaultOptions.map(option => ({
        label: option.label,
        value: option.value
      }))}
    />
  );
};

import { Select } from 'antd';

import { defaultOptions } from './config';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Header = (props: { onChange: any; value: any; }) => {
  const { onChange, value } = props;

  const handlePrevent = (evt: React.SyntheticEvent) => {
    evt.stopPropagation();
    return false;
  };

  return (
    <Select
      style={{ width: '100%' }}
      placeholder="默认"
      onClick={handlePrevent}
      value={value}
      onChange={onChange}
      dropdownRender={menu => <>{menu}</>}
      options={defaultOptions.map(option => ({
        label: option.label,
        value: option.value
      }))}
    />
  );
};

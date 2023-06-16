import { Select } from 'antd';

import { defaultOptions } from './consts';

export const Header = props => {
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
  );
};

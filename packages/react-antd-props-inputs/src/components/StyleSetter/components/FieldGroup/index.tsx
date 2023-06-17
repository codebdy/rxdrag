import { useState, useCallback } from 'react';
import { Group } from '../Group';
import { Header } from './Header';

export const FieldGroup = props => {
  const { title, activeKey, extra, children } = props;

  const [isActive, setIsActive] = useState(false);
  // 折叠面板切换回调
  const handleCollapseChange = useCallback((key: string | string[]) => {
    setIsActive(Array.isArray(key) && key.length > 0);
  }, []);

  return (
    <Group
      title={<Header extra={extra} isActive={isActive} title={title} />}
      activeKey={activeKey}
      onCollapseChange={handleCollapseChange}
    >
      {children}
    </Group>
  );
};

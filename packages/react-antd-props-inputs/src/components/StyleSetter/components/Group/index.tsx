import { useMemo } from 'react';
import { Collapse } from 'antd';
import cx from 'classnames';

const { Panel } = Collapse;

export const Group = props => {
  const { children, title, className, onCollapseChange, activeKey } = props;

  const klass = useMemo(() => cx('ts-accordion-field', className), [className]);

  return (
    <>
      <Collapse
        onChange={onCollapseChange}
        activeKey={activeKey}
        className={klass}
        expandIcon={() => null}
        ghost
      >
        <Panel header={title} key="panel" style={{ padding: 0 }}>
          <div className="ts-field-body">{children}</div>
        </Panel>
      </Collapse>
      <div className="ts-field-split-line"></div>
    </>
  );
};

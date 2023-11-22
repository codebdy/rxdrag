import { useMemo } from 'react';
import { Collapse, CollapseProps } from 'antd';
import cx from 'classnames';
import styled from 'styled-components';

const StyledCollapse = styled(Collapse)`
  .ant-collapse-header {
    padding: 0 !important;
    .anticon-caret-right {
      transition: 0.1s ease;
    }
  }
  .ant-collapse-content-box {
    padding: 0 !important;
  }
  .rx-field-body {
    margin: 0;
    padding: 0 8px;
    background-color: ${props => props.theme.token?.colorBgTextActive};
  }
`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Group = (props: any) => {
  const { children, title, className, onCollapseChange, activeKey } = props;

  const klass = useMemo(() => cx('rx-accordion-field', className), [className]);
  const items: CollapseProps['items'] = [
    {
      key: 'panel',
      label: title,
      children: <div className="rx-field-body">{children}</div>,
    },
  ];

  return (
    <>
      <StyledCollapse
        onChange={onCollapseChange}
        activeKey={activeKey}
        className={klass}
        expandIcon={() => null}
        ghost
        items={items}
      >
      </StyledCollapse>
      <div className="rx-field-split-line"></div>
    </>
  );
};

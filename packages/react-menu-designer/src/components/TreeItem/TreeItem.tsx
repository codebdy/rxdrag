import React, { forwardRef, HTMLAttributes } from 'react';
import classNames from 'classnames';
import './style.css';
import { Handle } from '../Handle';
import styled from 'styled-components';
import { Button } from 'antd';
import { DownOutlined, RightOutlined } from '@ant-design/icons';

export interface Props extends Omit<HTMLAttributes<HTMLLIElement>, 'id'> {
  childCount?: number;
  clone?: boolean;
  collapsed?: boolean;
  depth: number;
  disableInteraction?: boolean;
  disableSelection?: boolean;
  ghost?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleProps?: any;
  indicator?: boolean;
  indentationWidth: number;
  value: string;
  onCollapse?(): void;
  onRemove?(): void;
  wrapperRef?(node: HTMLLIElement): void;
}

const StyledItem = styled.div`
  position: relative;
  background-color: ${props => props.theme.token.colorBgContainer};
  border: 1px solid ${props => props.theme.token.colorBorder};
  color: ${props => props.theme.token.colorText};
  .remove{
    position: absolute;
    right: 0;
    transform: translateX(100%);
    display: none;
  }
  &:hover{
    .remove{
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
  }
`

const RemoveContainer = styled.div`
  height: 100%;
  width: 40px;
  position: absolute;
  right: -8px;
`

export const TreeItem = forwardRef<HTMLDivElement, Props>(
  (
    {
      childCount,
      clone,
      depth,
      disableSelection,
      disableInteraction,
      ghost,
      handleProps,
      indentationWidth,
      indicator,
      collapsed,
      onCollapse,
      onRemove,
      style,
      value,
      wrapperRef,
      ...props
    },
    ref
  ) => {
    const collapseIcon = collapsed ? <RightOutlined style={{ fontSize: 12 }} /> : <DownOutlined style={{ fontSize: 12 }} />
    return (
      <li
        className={classNames(
          'Wrapper',
          clone && 'clone',
          ghost && 'ghost',
          indicator && 'indicator',
          disableSelection && 'disableSelection',
          disableInteraction && 'disableInteraction'
        )}
        ref={wrapperRef}
        style={
          {
            '--spacing': `${indentationWidth * depth}px`,
          } as React.CSSProperties
        }
        {...props}
      >
        <StyledItem className={'TreeItem'} ref={ref} style={style}>
          <Handle {...handleProps} />
          <span className={'Text'}>{value}</span>
          {onCollapse && (
            <Button
              type="text"
              onClick={onCollapse}
              icon={collapseIcon}
            />
          )}
          {/* {!clone && onRemove &&
            <RemoveContainer className='remove'>
              <RemoveButton
                shape='circle'
                icon={<CloseOutlined  />}
                onClick={onRemove}
              />
            </RemoveContainer>
          } */}
          {clone && childCount && childCount > 1 ? (
            <span className={'Count'}>{childCount}</span>
          ) : null}
        </StyledItem>
      </li>
    );
  }
);
import React, { forwardRef, HTMLAttributes } from 'react';
import classNames from 'classnames';
import './style.css';
import { Handle } from '../Handle';
import { Action } from '../Action';
import { Remove } from '../Remove';
import styled from 'styled-components';

export interface Props extends Omit<HTMLAttributes<HTMLLIElement>, 'id'> {
  childCount?: number;
  clone?: boolean;
  collapsed?: boolean;
  depth: number;
  disableInteraction?: boolean;
  disableSelection?: boolean;
  ghost?: boolean;
  handleProps?: any;
  indicator?: boolean;
  indentationWidth: number;
  value: string;
  onCollapse?(): void;
  onRemove?(): void;
  wrapperRef?(node: HTMLLIElement): void;
}

const StyledItem = styled.div`
  background-color: ${props => props.theme.token.colorBgContainer};
  border: 1px solid ${props => props.theme.token.colorBorder};
  color: ${props => props.theme.token.colorText};
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
          {onCollapse && (
            <Action
              onClick={onCollapse}
              className={classNames(
                'Collapse',
                collapsed && 'collapsed'
              )}
            >
              {collapseIcon}
            </Action>
          )}
          <span className={'Text'}>{value}</span>
          {!clone && onRemove && <Remove onClick={onRemove} />}
          {clone && childCount && childCount > 1 ? (
            <span className={'Count'}>{childCount}</span>
          ) : null}
        </StyledItem>
      </li>
    );
  }
);

const collapseIcon = (
  <svg width="10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 70 41">
    <path d="M30.76 39.2402C31.885 40.3638 33.41 40.995 35 40.995C36.59 40.995 38.115 40.3638 39.24 39.2402L68.24 10.2402C69.2998 9.10284 69.8768 7.59846 69.8494 6.04406C69.822 4.48965 69.1923 3.00657 68.093 1.90726C66.9937 0.807959 65.5106 0.178263 63.9562 0.150837C62.4018 0.123411 60.8974 0.700397 59.76 1.76024L35 26.5102L10.24 1.76024C9.10259 0.700397 7.59822 0.123411 6.04381 0.150837C4.4894 0.178263 3.00632 0.807959 1.90702 1.90726C0.807714 3.00657 0.178019 4.48965 0.150593 6.04406C0.123167 7.59846 0.700153 9.10284 1.75999 10.2402L30.76 39.2402Z" />
  </svg>
);

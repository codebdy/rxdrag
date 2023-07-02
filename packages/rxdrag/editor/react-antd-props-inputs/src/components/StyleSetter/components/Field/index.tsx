import { useMemo, ReactNode, CSSProperties } from 'react';
import cx from 'classnames';
import styled from 'styled-components';

const StyledField = styled.div`
  .rx-field-head {
    display: flex;
    align-items: center;
    .rx-field-title {
      width: 24%;
      margin-right: 10px;
      color: ${props => props.theme.token?.colorText};
    }
    .rx-field-content {
      flex: 1;
      display: flex;
    }
  }
  &.rx-field-middle {
    .rx-field-head {
      min-height: 44px;
    }
  }
  &.active {
    .rx-field-head {
      .rx-field-title {
        color: ${props => props.theme.token?.colorPrimary};
      }
    }
  }
`;

export const Field = (props: {
  label: ReactNode;
  extra?: ReactNode;
  children?: ReactNode;
  active?: boolean;
  size?: 'small' | 'middle';
  className?: string;
  style?: CSSProperties;
  contentStyle?: CSSProperties;
  underline?: boolean;
}) => {
  const {
    label,
    children,
    size = 'middle',
    active = false,
    className,
    style,
    extra,
    underline = false,
    contentStyle = {}
  } = props;

  const klassName = useMemo(
    () =>
      cx(`rx-field rx-field-${size}`, className, {
        active: active === true
      }),
    [size, active, className]
  );

  return (
    <StyledField className={klassName} style={style}>
      <div className="rx-field-head">
        <div className="rx-field-title">{label}</div>
        <div className="rx-field-content" style={contentStyle}>
          {extra}
        </div>
      </div>
      <div className="rx-field-body">{children}</div>
      {underline && <div className="rx-field-split-line"></div>}
    </StyledField>
  );
};

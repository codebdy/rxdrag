import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Col } from "antd";
import { memo } from "react";
import styled from "styled-components";
import { useTrans } from "../../hooks/useTrans";
const Icon = styled.div `
  width: 100%;
  font-size: 28px;
  height: 54px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  border-radius: 8px;
  background-color: ${props => props.theme.token?.colorBorderSecondary};
`;
const Shell = styled((props) => _jsx(Col, { span: 12, ...props })) `
  display: flex;
  flex-flow: column;
  align-items: center;
  user-select: none;
  cursor: move;
  color: ${props => props.theme.token?.colorTextSecondary};
  &:hover {
    color: ${props => props.theme.token?.colorText};
  };
  &:hover ${Icon}{
    background-color: ${props => props.theme.token?.colorBorder};
  };
  box-sizing: border-box;
  margin-top: 8px;
  margin-bottom: 8px;
`;
const Title = styled.div `
  margin-top: 8px;
  font-size: 12px;
`;
export const ToolItem = memo((props) => {
    const { title, icon, color, ...other } = props;
    const t = useTrans();
    return (_jsxs(Shell, { ...other, children: [_jsx(Icon, { style: { color }, children: icon }), _jsx(Title, { children: t(title) })] }));
});

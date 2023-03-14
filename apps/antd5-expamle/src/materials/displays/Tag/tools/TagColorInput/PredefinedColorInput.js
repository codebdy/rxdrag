import { jsx as _jsx } from "react/jsx-runtime";
import React, { useCallback, useRef, useState } from 'react';
import { Input, Popover, Space, Tag } from 'antd';
import styled from 'styled-components';
const Container = styled.div `
  width: 100%;
  .color-tips {
    cursor: pointer;
  }
`;
const StyledSpace = styled(Space) `
  width: 248px;
  padding: 8px;
`;
const ColorCell = styled(Tag) `
  width: 64px;
  height: 28px;
  border: ${props => props.theme.token?.colorBorder} solid 1px;
  cursor: pointer;
`;
export const PredefinedColorInput = (props) => {
    const { colors, onChange, value, ...other } = props;
    const [open, setOpen] = useState(false);
    const container = useRef(null);
    const handleCellClick = useCallback((color) => {
        onChange?.(color);
        setOpen(false);
    }, [onChange]);
    const hanldleOpenChange = useCallback((open) => {
        setOpen(open);
    }, []);
    return (_jsx(Container, { ref: container, ...other, children: _jsx(Input, { readOnly: true, onChange: (e) => {
                onChange?.(e.target.value);
            }, prefix: _jsx(Popover, { autoAdjustOverflow: true, trigger: "click", overlayInnerStyle: { padding: 0 }, placement: "bottom", open: open, onOpenChange: hanldleOpenChange, content: _jsx(StyledSpace, { wrap: true, align: 'center', children: colors.map((color => {
                        return (_jsx(ColorCell, { color: color, onClick: () => handleCellClick(color), children: color }, color));
                    })) }), children: _jsx(Tag, { color: value, className: "color-tips", children: value || "color" }) }) }) }));
};

import { jsx as _jsx } from "react/jsx-runtime";
import React, { forwardRef, memo } from "react";
import { Typography as AntdTypography } from "antd";
import { TypographyType } from "../types";
import { useFormat } from "../hooks/useFormat";
export const Title = memo(forwardRef((props, ref) => {
    const { value, textType = TypographyType.Text, formatMask, ...other } = props;
    const text = useFormat(value, textType, formatMask);
    return (_jsx(AntdTypography.Title, { ref: ref, ...other, children: text }));
}));

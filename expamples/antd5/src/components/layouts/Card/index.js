import { jsx as _jsx } from "react/jsx-runtime";
import { Card as AntdCard } from "antd";
import { forwardRef, memo } from "react";
export const Card = memo(forwardRef((props, ref) => {
    const { actions, ...other } = props;
    return (_jsx(AntdCard, { ref: ref, actions: actions ? [actions] : undefined, ...other }));
}));

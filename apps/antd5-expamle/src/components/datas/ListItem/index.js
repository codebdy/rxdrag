import { jsx as _jsx } from "react/jsx-runtime";
import List from "antd/es/list";
import React, { forwardRef, memo } from "react";
export const ListItem = memo(forwardRef((props, ref) => {
    const { actions, ...other } = props;
    return (_jsx(List.Item, { actions: actions ? [actions] : actions, ...other }));
}));

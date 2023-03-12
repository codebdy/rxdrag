import { jsx as _jsx } from "react/jsx-runtime";
import { CloseOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
export const CloseButton = (props) => {
    const { style, ...other } = props;
    return (_jsx(Button, { type: "primary", danger: true, shape: "circle", size: 'small', style: {
            position: "absolute",
            top: -12,
            right: -16,
            width: 18,
            minWidth: 16,
            height: 18,
            zIndex: 10,
            padding: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            ...style || {},
        }, icon: _jsx(CloseOutlined, { style: { fontSize: 10 } }), ...other }));
};

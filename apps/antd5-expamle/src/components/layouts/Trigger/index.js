import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import React from "react";
import { memo, forwardRef } from "react";
import { useLayoutParams } from "../context";
import "./style.less";
export const Trigger = memo(forwardRef((props, ref) => {
    const { disable } = props;
    const { collapsed, setCollapsed } = useLayoutParams() || {};
    return (React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: 'trigger',
        ref: ref,
        onClick: () => !disable && setCollapsed?.(!collapsed),
    }));
}));

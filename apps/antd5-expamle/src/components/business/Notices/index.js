import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { forwardRef, memo } from 'react';
import { List, Typography } from 'antd';
const data = [
    {
        type: "升级",
        title: "Apper 2.0正式发布",
        date: "刚刚",
    },
    {
        type: "部署",
        title: "云服务器版发布",
        date: "1天前"
    },
    {
        type: "通告",
        title: "国庆放假50天",
        date: "1周前"
    },
];
export const Notices = memo(forwardRef((props, ref) => {
    return (_jsx(List, { ...props, style: { marginLeft: -24, marginTop: -16 }, dataSource: data, renderItem: (item) => (_jsxs(List.Item, { children: [_jsxs("div", { children: [_jsx(Typography.Text, { code: true, children: item.type }), " ", item.title] }), _jsx(Typography.Text, { type: "secondary", children: item.date })] })) }));
}));

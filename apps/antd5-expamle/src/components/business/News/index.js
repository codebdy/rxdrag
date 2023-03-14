import { jsx as _jsx } from "react/jsx-runtime";
import React, { forwardRef, memo } from 'react';
import { Avatar, List } from 'antd';
import "./style.less";
const data = [
    {
        title: 'Ant Design Title 1',
    },
    {
        title: 'Ant Design Title 2',
    },
    {
        title: 'Ant Design Title 3',
    },
    {
        title: 'Ant Design Title 4',
    },
];
export const News = memo(forwardRef((props, ref) => {
    return (_jsx(List, { ...props, className: 'rx-news', style: { marginLeft: -16, marginTop: -16 }, dataSource: data, renderItem: (item) => (_jsx(List.Item, { children: _jsx(List.Item.Meta, { avatar: _jsx(Avatar, {}), title: _jsx("a", { href: "https://ant.design", children: item?.title }), description: "Ant Design, a design language for background applications, is refined by Ant UED Team" }) })) }));
}));

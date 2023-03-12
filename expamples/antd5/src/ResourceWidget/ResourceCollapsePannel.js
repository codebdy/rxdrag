import { jsx as _jsx } from "react/jsx-runtime";
import { Collapse, Row } from "antd";
import { useCallback, useEffect, useState } from "react";
const key = "collapse-panel";
export const ResourceCollapsePannel = (props) => {
    const { title, defaultExpand, children, ...other } = props;
    const [expanded, setExpanded] = useState(defaultExpand);
    useEffect(() => {
        setExpanded(defaultExpand);
    }, [defaultExpand]);
    const handleChange = useCallback((activedKey) => {
        setExpanded(!!activedKey);
    }, []);
    return (_jsx(Collapse, { accordion: true, activeKey: expanded ? key : "", ghost: true, 
        //expandIconPosition="end"
        onChange: handleChange, ...other, children: _jsx(Collapse.Panel, { header: _jsx("div", { children: title }), children: _jsx(Row, { gutter: 0, children: children }) }, key) }));
};

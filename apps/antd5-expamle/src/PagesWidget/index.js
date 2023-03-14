import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Tree from "antd/es/tree";
import { memo, useCallback } from "react";
import { PaneContainer } from "react-shells/ant5/layouts/ToggleAblePane/PaneContainer";
import { PanelContent } from "react-shells/ant5/layouts/ToggleAblePane/PanelContent";
import { PaneTitle } from "react-shells/ant5/layouts/ToggleAblePane/PaneTitle";
const { DirectoryTree } = Tree;
const treeData = [
    {
        title: '展示页',
        key: 'displays',
        children: [
            { title: '工作台', key: 'dashboard', isLeaf: true },
            { title: '详情页', key: 'details', isLeaf: true },
            { title: '列表页', key: 'list', isLeaf: true },
            { title: '测试页', key: 'test', isLeaf: true },
            { title: '打地鼠', key: 'mole', isLeaf: true },
        ],
    },
    {
        title: '表单页',
        key: 'forms',
        children: [
            { title: '基础表单', key: 'basic-form', isLeaf: true },
            { title: '分步表单', key: 'step-form', isLeaf: true },
            { title: '高级表单', key: 'advance-form', isLeaf: true },
        ],
    },
];
export const PagesWidget = memo((props) => {
    const { value, onSelect, display } = props;
    const handleSelect = useCallback((keys) => {
        onSelect(keys?.[0].toString() || "");
    }, [onSelect]);
    return (_jsxs(PaneContainer, { style: { display: display ? undefined : "none" }, children: [_jsx(PaneTitle, { title: "pages" }), _jsx(PanelContent, { style: { paddingTop: 8 }, children: _jsx(DirectoryTree, { selectedKeys: [value], multiple: false, defaultExpandAll: true, onSelect: handleSelect, treeData: treeData }) })] }));
});

import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { memo } from "react";
import { Collapse as AntdCollapse } from "antd";
import styled from "styled-components";
import { ActivityResource, ToolItem, ToolItemCategory } from "@rxdrag/minions-logicflow-editor";
const Collapse = styled(AntdCollapse) `
  flex:1;
  border-radius: 0;
  overflow: auto;
`;
const { Panel } = AntdCollapse;
export const Toolbox = memo((props) => {
    const { materialCategories, addons } = props;
    return (_jsxs(Collapse, { defaultActiveKey: [materialCategories?.[0]?.name], bordered: false, accordion: true, expandIconPosition: "end", children: [materialCategories.map(category => {
                return (_jsx(Panel, { header: category.name, children: _jsx(ToolItemCategory, { children: category.materials.map((materail, index) => {
                            return _jsx(ActivityResource, { material: materail, children: (onStartDrag) => {
                                    return _jsx(ToolItem, { icon: materail.icon, title: materail.label, color: materail.color, onMouseDown: onStartDrag });
                                } }, index + materail.activityName);
                        }) }) }, category.name));
            }), addons] }));
});

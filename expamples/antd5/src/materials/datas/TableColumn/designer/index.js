import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { forwardRefByChildren } from "core-react/hocs/forwardRefByChildren";
import { memo } from "react";
const TableColumnDesignerImpl = memo((props) => {
    const { children } = props;
    return (_jsx(_Fragment, { children: children }));
});
export const TableColumnDesigner = forwardRefByChildren(TableColumnDesignerImpl);

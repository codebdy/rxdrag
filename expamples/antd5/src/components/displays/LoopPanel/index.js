import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { forwardRef, memo } from "react";
import { Field } from "runner/fieldy/components/Field";
export const LoopPanel = memo(forwardRef((props, ref) => {
    const { value, children } = props;
    return (_jsx(_Fragment, { children: value?.map((item, index) => {
            return (_jsx(Field, { name: index.toString(), value: item, children: children }, index));
        }) }));
}));

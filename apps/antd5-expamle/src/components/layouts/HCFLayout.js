import { jsxs as _jsxs } from "react/jsx-runtime";
import { Layout } from "antd";
import { forwardRef, memo } from "react";
const { Header, Footer, Content } = Layout;
/**
 * HeaderContentFooter layout
 */
export const HCFLayout = memo(forwardRef((props, ref) => {
    const { header, footer, content } = props;
    return (_jsxs(Layout, { ref: ref, children: [header, content, footer] }));
}));

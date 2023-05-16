import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { memo, useCallback, useEffect, useState } from "react";
import { NavButton } from "./NavButton";
export const LeftNavWidget = memo((props) => {
    const { showTitle, activedKey, defaultActivedKey, items, onActive } = props;
    const [actived, setActived] = useState(defaultActivedKey);
    useEffect(() => {
        setActived(defaultActivedKey);
    }, [defaultActivedKey]);
    useEffect(() => {
        if (activedKey !== undefined) {
            setActived(activedKey);
        }
    }, [activedKey]);
    const handleSelect = useCallback((key) => {
        setActived(key);
        onActive?.(key);
    }, [onActive]);
    return (_jsx(_Fragment, { children: items?.map(item => {
            return _jsx(NavButton, { actived: actived === item.key, item: item, showTitle: showTitle, onSelect: handleSelect }, item.key);
        }) }));
});

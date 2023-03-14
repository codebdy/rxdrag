import { jsx as _jsx } from "react/jsx-runtime";
import React, { forwardRef, memo, useState } from "react";
import { List as AntdList } from "antd";
import { ArrayField } from "runner/fieldy/components/ArrayField/ArrayField";
import { createUuid } from "react-shells/ant5/SettingsForm/components/ReactionsInput/ReactionsEditor/utils";
import { ObjectField } from "runner/fieldy/components/ObjectField";
export const List = memo(forwardRef((props, ref) => {
    const { renderItem, dataSource, ...other } = props;
    const [id] = useState(createUuid());
    return (_jsx(ArrayField, { name: id, value: dataSource?.nodes, children: _jsx(AntdList, { dataSource: dataSource?.nodes, renderItem: (item, index) => (_jsx(ObjectField, { name: index.toString(), value: item, children: renderItem })), ...other }) }));
}));

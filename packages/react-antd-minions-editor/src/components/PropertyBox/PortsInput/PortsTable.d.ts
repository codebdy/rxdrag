import React from 'react';
import { IPortDefine } from '@rxdrag/schema';
export declare const PortsTable: React.MemoExoticComponent<(props: {
    onClose: () => void;
    value?: IPortDefine[] | undefined;
    onChange?: ((value?: IPortDefine[]) => void) | undefined;
    type: "input" | "output";
}) => JSX.Element>;

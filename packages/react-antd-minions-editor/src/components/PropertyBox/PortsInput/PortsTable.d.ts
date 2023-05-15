import React from 'react';
import { IPortMeta } from '@rxdrag/schema';
export declare const PortsTable: React.MemoExoticComponent<(props: {
    onClose: () => void;
    value?: IPortMeta[] | undefined;
    onChange?: ((value?: IPortMeta[]) => void) | undefined;
    type: "input" | "output";
}) => JSX.Element>;

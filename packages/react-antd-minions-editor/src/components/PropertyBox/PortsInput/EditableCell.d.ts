import React from 'react';
interface Item {
    key: string;
    name: string;
    age: string;
    address: string;
}
export interface EditableCellProps {
    title: React.ReactNode;
    editable: boolean;
    children: React.ReactNode;
    dataIndex: keyof Item;
    record: Item;
    handleSave: (record: Item) => void;
}
export declare const EditableCell: React.FC<EditableCellProps>;
export {};

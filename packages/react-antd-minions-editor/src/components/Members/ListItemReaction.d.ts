import React from "react";
export declare const ListItemReaction: React.MemoExoticComponent<(props: {
    name: string;
    children?: React.ReactNode;
    editTitle: string;
    id: string;
    onChange: (id: string, name: string) => void;
    onRemove: (id: string) => void;
}) => JSX.Element>;

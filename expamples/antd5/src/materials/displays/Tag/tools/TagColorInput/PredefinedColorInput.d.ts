import React from 'react';
export interface IColorInputProps {
    value?: string;
    onChange?: (color: string) => void;
    colors: string[];
}
export declare const PredefinedColorInput: React.FC<IColorInputProps>;

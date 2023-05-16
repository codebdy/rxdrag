import "./style.less";
export declare enum ToggleType {
    left = "left",
    right = "right"
}
export declare const ToggleButton: (props: {
    toggleType?: ToggleType;
    toggled?: boolean;
    onClick: () => void;
}) => JSX.Element;

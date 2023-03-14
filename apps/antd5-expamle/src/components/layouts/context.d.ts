export interface ILayoutContextParams {
    collapsed?: boolean;
    setCollapsed?: (collapsed?: boolean | ((collapsed?: boolean) => boolean)) => void;
    scrolled?: boolean;
    setScrolled?: (scroll?: boolean | ((scroll?: boolean) => boolean)) => void;
}
export declare const LayoutContext: any;
export declare const useLayoutParams: () => ILayoutContextParams | undefined;

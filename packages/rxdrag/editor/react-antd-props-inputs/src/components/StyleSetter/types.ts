export type StyleData = string | number | boolean | undefined;

export interface RadioItem {
  value: string;
  icon?: string | React.ReactElement;
  label?: string;
  tips: string;
  data?: Record<string, any>;
}

export type StyleChangeListener = {
  (styleKey: string, value: StyleData): void;
};

export type SetterProps = {
  onStyleChange: StyleChangeListener;
  value: any;
};

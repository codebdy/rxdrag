
export enum TypographyType {
  Number = "Number",
  Date = "Date",
  Text = "Text"
}

export interface ITypographyProps {
  textType?: TypographyType;
  formatMask?: string;
  value?: string;
  code?: boolean;
  delete?: boolean;
  disabled?: boolean;
  ellipsis?: boolean;
  mark?: boolean;
  strong?: boolean;
  italic?: boolean;
  type?: 'secondary' | 'success' | 'warning' | 'danger';
  underline?: boolean;
}
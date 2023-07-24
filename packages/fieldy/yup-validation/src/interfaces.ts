
//对应yup类型
export enum YupType {
  string = "string",
  number = "number",
  boolean = "boolean",
  date = "date",
  array = "array",
  tuple = "tuple",
}

export interface ValidateType {
  //比如email， url等
  name: string;
}

//对应yup类型
export enum YupType {
  string = "string",
  number = "number",
  boolean = "boolean",
  date = "date",
  array = "array",
  tuple = "tuple",
  object = "object",
}

//内联代码，格式：{{...}}
export type FunctionStr = string;

export interface YupSchema {
  type: YupType,
  nullable?: boolean,//还不知道怎么用
  nonNullable?: boolean,//还不知道怎么用
  required?: boolean | string | FunctionStr,
  oneOf?: {
    arrayOfValues: Array<any>,
    message: string | FunctionStr
  },
  notOneOf?: {
    arrayOfValues: Array<any>,
    message: string | FunctionStr
  },
  when?: {
    deps: string | string[],
    is: any | FunctionStr,
    then?: FunctionStr,
    otherwise?: FunctionStr,
  } | {
    deps: string | string[],
    body?: FunctionStr,
  }
}

export interface IRef {
  path: string,
  options?: {
    contextPrefix: string,
  }
}

export interface IYupConfig<Type> {
  value: Type,
  message?: string | FunctionStr,
}

export interface YupString extends YupSchema {
  required?: boolean | string | FunctionStr,
  length?: IYupConfig<number | IRef>,
  min?: IYupConfig<number | IRef>,
  max?: IYupConfig<number | IRef>,
  matches?: IYupConfig<string> & {
    options?: {
      message: string,
      excludeEmptyString: boolean,
    }
  },
  email?: IYupConfig<boolean>,
  url?: IYupConfig<boolean>,
  uuid?: IYupConfig<boolean>,
}

export interface YupNumber extends YupSchema {
  min?: IYupConfig<number | IRef>,
  max?: IYupConfig<number | IRef>,
  lessThan?: IYupConfig<number | IRef>,
  moreThan?: IYupConfig<number | IRef>,
  positive?: string | FunctionStr,
  negative?: string | FunctionStr,
  integer?: string | FunctionStr,
}

export interface YupDate extends YupSchema {
  min?: IYupConfig<string | Date | IRef>,
  max?: IYupConfig<string | Date | IRef>,
}

export interface YupArray extends YupSchema {
  length?: IYupConfig<number | IRef>,
  min?: IYupConfig<number | IRef>,
  max?: IYupConfig<number | IRef>,
}

//字符串时，引用预定义的规则，比如email， url等
export type ValidateRules = string | YupArray | YupDate | YupNumber | YupString

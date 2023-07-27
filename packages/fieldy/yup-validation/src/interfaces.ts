
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

//内联代码
export type FunctionStr = string;

export type WhenType = {
  deps?: string[],
  body?: FunctionStr,
}

export interface YupSchema {
  nullable?: boolean,//还不知道怎么用
  nonNullable?: boolean,//还不知道怎么用
  required?: boolean, //| string | FunctionStr,
  oneOf?: {
    arrayOfValues: Array<any>,
    message: string,
  },
  notOneOf?: {
    arrayOfValues: Array<any>,
    message: string,
  },
  when?: WhenType/* {
    deps: string | string[],
    is: any | FunctionStr,
    then?: FunctionStr,
    otherwise?: FunctionStr,
  } | {
    deps: string | string[],
    body?: FunctionStr,
  }*/,
  test?: {
    message?: string,
    test?: FunctionStr,
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
  message?: string,
}

export interface YupString extends YupSchema {
  required?: boolean, //| string | FunctionStr,
  //先删掉，用最大长度跟最小长度结合使用
  //length?: IYupConfig<number | IRef>,
  min?: IYupConfig<number | IRef>,
  max?: IYupConfig<number | IRef>,
  matches?: IYupConfig<string> & {
    excludeEmptyString: boolean,
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

export type YupConfig = YupSchema | YupArray | YupDate | YupNumber | YupString

export type YupValidateRules = {
  //类型，引用预定义的规则，比如email， url等。
  type?: {
    value: string | YupType,
    message?: string,
  },
  config?: YupConfig
}

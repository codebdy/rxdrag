export enum BaseDataType {
  ID = "ID",
  Int = "Int",
  Float = "Float",
  Boolean = "Boolean",
  String = "String",
  Date = "Date",
  Enum = "Enum",
  Range = "Range",
}

/**
 * 字段类型，目前版本仅支持这些类型，后续可以扩展
 */
export enum ExtendType {
  JSON = "JSON",
  ValueObject = "ValueObject",
  Entity = "Entity",

  IDArray = "ID[]",
  IntArray = "Int[]",
  FloatArray = "Float[]",
  StringArray = "String[]",
  DateArray = "Date[]",
  EnumArray = "EnumArray",
  JSONArray = "JSONArray",
  ValueObjectArray = "ValueObjectArray",
  EntityArray = "EntityArray",
  File = "File",
  Password = "Password",
  Uuid = "Uuid"
}

export type Type = ExtendType | BaseDataType

export const Types = { ...ExtendType, ...BaseDataType };
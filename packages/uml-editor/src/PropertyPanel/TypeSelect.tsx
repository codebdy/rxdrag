import { useTranslate } from "@rxdrag/react-locales";
import { Type, Types } from "@rxdrag/uml-schema";
import { Select } from "antd"
import React, { useCallback } from "react"
import { memo } from "react"
const { Option } = Select;

export const TypeSelect = memo((
  props: {
    disabled?: boolean,
    value?: Type,
    onChange?: (value?: Type) => void,
    noEntity?: boolean,
    style?: React.CSSProperties,
  }
) => {
  const { value, disabled, onChange, noEntity, style } = props
  const  t  = useTranslate();

  const handleChange = useCallback((value:any) => {
    onChange && onChange(value)
  }, [onChange])

  return (
    <Select style={style} value={value} disabled={disabled} onChange={handleChange}>
      <Option value={Types.ID}>ID</Option>
      <Option value={Types.Int}>Int</Option>
      <Option value={Types.Float}>Float</Option>
      <Option value={Types.Boolean}>Boolean</Option>
      <Option value={Types.String}>String</Option>
      <Option value={Types.Date}>Date</Option>
      <Option value={Types.Uuid}>UUID</Option>
      <Option value={Types.Enum}>{t("Enum")}</Option>
      <Option value={Types.JSON}>JSON</Option>
      <Option value={Types.ValueObject}>{t("ValueClass")}</Option>
      {
        !noEntity &&
        <Option value={Types.Entity}>{t("Entity")}</Option>
      }
      <Option value={Types.File}>{t("File")}</Option>
      <Option value={Types.Password}>{t("Password")}</Option>
      <Option value={Types.IDArray}>ID {t("Array")}</Option>
      <Option value={Types.IntArray}>Int {t("Array")}</Option>
      <Option value={Types.FloatArray}>Float {t("Array")}</Option>
      <Option value={Types.StringArray}>String {t("Array")}</Option>
      <Option value={Types.DateArray}>Date {t("Array")}</Option>
      <Option value={Types.EnumArray}>
        {t("Enum")}
        {t("Array")}
      </Option>
      <Option value={Types.JSONArray}>
        {"JSON"}
        {t("Array")}
      </Option>
      <Option value={Types.ValueObjectArray}>
        {t("ValueClass")}
        {t("Array")}
      </Option>
      {
        !noEntity &&
        <Option value={Types.EntityArray}>
          {t("Entity")}
          {t("Array")}
        </Option>
      }
    </Select>
  )
})
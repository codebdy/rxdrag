import { useTranslate } from "@rxdrag/react-locales";
import { StereoType, Type, Types } from "@rxdrag/uml-schema";
import { Form, Select } from "antd";
import React, { useMemo } from "react"
import { memo } from "react"
import { useMetaContent } from "../../hooks/useMetaContent";
const { Option } = Select;

export const TypeUuidSelect = memo((
  props: {
    type?: Type,
    withFormItem?: boolean,
    value?: string,
    onChange?: (value?: string) => void,
    style?: React.CSSProperties,
  }
) => {
  const { type, withFormItem, value, onChange, style } = props;
  const metaContent = useMetaContent()
  const enums = useMemo(
    () => metaContent?.classes?.filter(cls => cls.stereoType === StereoType.Enum),
    [metaContent?.classes]
  );
  const valueObjects = useMemo(
    () => metaContent?.classes?.filter(cls => cls.stereoType === StereoType.ValueObject),
    [metaContent?.classes]
  );;
  const entities = useMemo(
    () => metaContent?.classes?.filter(cls => cls.stereoType === StereoType.Entity),
    [metaContent?.classes]
  );;
  const t = useTranslate();

  const [title, classes] = useMemo(() => {
    if (type === Types.Enum ||
      type === Types.EnumArray) {
      return [t("EnumClass"), enums]
    }

    if (type === Types.ValueObject ||
      type === Types.ValueObjectArray) {
      return [t("ValueClass"), valueObjects]
    }

    if (type === Types.Entity ||
      type === Types.EntityArray) {
      return [t("EntityClass"), entities]
    }

    return []
  }, [type, t, enums, valueObjects, entities])

  return (
    classes ? (
      withFormItem
        ?
        <Form.Item
          label={title}
          name="typeUuid"
        >
          <Select style={style}>
            <Option key="" value="">
              <em>None</em>
            </Option>
            {classes.map((cls) => {
              return (
                <Option key={cls.uuid} value={cls.uuid}>{cls.name}</Option>
              );
            })}
          </Select>
        </Form.Item>
        :
        <Select style={style} value={value} onChange={onChange}>
          <Option key="" value="">
            <em>None</em>
          </Option>
          {classes.map((cls) => {
            return (
              <Option key={cls.uuid} value={cls.uuid}>{cls.name}</Option>
            );
          })}
        </Select>
    )
      : <></>
  )
})
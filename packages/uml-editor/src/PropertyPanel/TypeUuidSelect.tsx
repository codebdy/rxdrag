import { Form, Select } from "antd";
import React, { useMemo } from "react"
import { memo } from "react"
import { useTranslation } from "react-i18next";
import { useMetaId } from "../hooks/useMetaId";
import { useEntities } from "../hooks/useEntities";
import { useEnums } from "../hooks/useEnums";
import { useValueObjects } from "../hooks/useValueObjects";
import { Type, Types } from "../meta"
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
  const metaId = useMetaId();
  const enums = useEnums(metaId);
  const valueObjects = useValueObjects(metaId);
  const entities = useEntities(metaId);
  const { t } = useTranslation();

  const [title, classes] = useMemo(() => {
    if (type === Types.Enum ||
      type === Types.EnumArray) {
      return [t("UmlEditor.EnumClass"), enums]
    }

    if (type === Types.ValueObject ||
      type === Types.ValueObjectArray) {
      return [t("UmlEditor.ValueClass"), valueObjects]
    }

    if (type === Types.Entity ||
      type === Types.EntityArray) {
      return [t("UmlEditor.EntityClass"), entities]
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
    :<></>
  )
})
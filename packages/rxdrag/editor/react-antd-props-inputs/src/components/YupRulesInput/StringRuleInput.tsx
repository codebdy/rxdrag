import { YupString } from "@rxdrag/fieldy-yup-validation";
import { useSettersTranslate } from "@rxdrag/react-core";
import { Checkbox, Input, InputNumber, Space } from "antd";
import { memo } from "react"
import { PropLayout } from "../PropLayout";
import { MessageInput } from "./MessageInput";

export const StringRuleInput = memo((
  props: {
    value?: YupString,
    onChange?: (value?: YupString) => void
  }
) => {
  const { value, onChange } = props;
  const t = useSettersTranslate()
  return (
    <>
      <PropLayout
        label={t('maxLength')}
        expressionSetter={<MessageInput />}
      >
        <InputNumber />
      </PropLayout>
      <PropLayout
        label={t('minLength')}
        expressionSetter={<MessageInput />}
      >
        <InputNumber />
      </PropLayout>
      <PropLayout
        label={t('matches')}
        expressionSetter={<MessageInput />}
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          <Input.TextArea  />
          <Checkbox >{t("excludeEmptyString")}</Checkbox>
        </Space>
      </PropLayout>
    </>
  )
})
import { YupString } from "@rxdrag/fieldy-yup-validation";
import { useSettersTranslate } from "@rxdrag/react-core";
import { InputNumber } from "antd";
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
    </>
  )
})
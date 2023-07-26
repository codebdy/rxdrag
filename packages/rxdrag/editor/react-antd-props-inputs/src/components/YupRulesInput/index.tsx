import { Form } from "antd"
import { memo } from "react"
import { YupValidateRules } from "@rxdrag/fieldy-yup-validation"
import { useSettersTranslate } from "@rxdrag/react-core"

export const YupRulesInput = memo((
  props: {
    value?: YupValidateRules,
    onChange?: (value?: YupValidateRules) => void
  }
) => {
  const { value, onChange } = props;
  const t = useSettersTranslate()
  return (
    <>
      <Form.Item label={t('validationType')}>

      </Form.Item>
    </>
  )
})
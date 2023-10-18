import { Form, Input } from "antd";
import { useTranslation } from "react-i18next";

export const AssgnmentItem = (props: { element: any, modeler: any }) => {
  const { t } = useTranslation()
  return (
    <>
      <Form.Item
        label={t("AppBpmn.Assignee")}
        name="assignee"
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={t("AppBpmn.Candidate groups")}
        name="candidateGroups"
      >
        <Input />
      </Form.Item>
    </>
  )
}
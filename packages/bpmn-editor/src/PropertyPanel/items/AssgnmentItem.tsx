import { useTranslate } from "@rxdrag/react-locales";
import { Form, Input } from "antd";

export const AssgnmentItem = (props: { element: any, modeler: any }) => {
  const t = useTranslate();
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
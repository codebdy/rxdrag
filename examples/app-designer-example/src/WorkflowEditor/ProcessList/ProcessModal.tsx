import { Form, Modal } from "antd";
import { useCallback } from "react";
import { memo } from "react";
import ProcessForm from "./ProcessForm";
import { IProcess, IProcessCategory } from "../../interfaces/process";
import { useTranslate } from "@rxdrag/react-locales";
import { useSaveProcess } from "../../hooks/useSaveProcess";
import { createId } from "@rxdrag/shared";

const empertyBpmn = `
<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:modeler="http://camunda.org/schema/modeler/1.0" xmlns:camunda="http://camunda.org/schema/1.0/bpmn" id="Definitions_1" targetNamespace="http://bpmn.io/schema/bpmn" exporter="Camunda Web Modeler" exporterVersion="59c8727" modeler:executionPlatform="Camunda Cloud" modeler:executionPlatformVersion="8.0.0" camunda:diagramRelationId="ea0ce2e3-b302-4fb4-941a-2ce99ea8b1aa">
  <bpmn:process id="$processId" isExecutable="true">
    <bpmn:startEvent id="StartEvent_1" />
  </bpmn:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="$processId">
      <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">
        <dc:Bounds x="150" y="100" width="36" height="36" />
      </bpmndi:BPMNShape>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>
`

const ProcessModal = memo((
  props: {
    categoryId?: string,
    categories: IProcessCategory[],
    isModalVisible: boolean,
    onClose: () => void,
  }
) => {
  const { categoryId, categories, isModalVisible, onClose } = props;
  const [form] = Form.useForm();
  const t = useTranslate();
  const [upsert, { loading }] = useSaveProcess({
    onComplete: () => {
      form.resetFields();
      onClose();
    }
  });


  const handleConfirm = useCallback(() => {
    form.validateFields().then((values: IProcess) => {
      const id = createId();
      const xml = empertyBpmn.replace("$processId", "Process_" + id)
      if (values.categoryId) {
        upsert({ name: values.name, id, xml, categoryId: values.categoryId, app: { id: "app1" } });
      } else {
        upsert({ name: values.name, id, xml, app: { id: "app1" } });
      }
    });
  }, [upsert, form]);

  const handleCancel = useCallback(() => {
    form.resetFields();
    onClose()
  }, [form, onClose]);

  return (
    <Modal
      title={t("AddProcess")}
      open={isModalVisible}
      cancelText={t("Cancel")}
      okText={t("Confirm")}
      onCancel={handleCancel}
      onOk={handleConfirm}
      confirmLoading={loading}
    >
      <ProcessForm categoryId={categoryId} categories={categories} form={form} />
    </Modal>
  )
})

export default ProcessModal;
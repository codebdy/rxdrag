import { Form, Modal } from "antd";
import { useCallback } from "react";
import { memo } from "react";
import ProcessForm from "./ProcessForm";
import { useShowError } from "hooks/useShowError";
import { useTranslation } from "react-i18next";
import { IPageCategory } from "model";
import { createUuid } from "shared";
import { useUpsertProcess } from "../hooks/useUpsertProcess";

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
    categoryUuid?: string,
    categories: IPageCategory[],
    isModalVisible: boolean,
    onClose: () => void,
  }
) => {
  const { categoryUuid, categories, isModalVisible, onClose } = props;
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const [upsert, { loading, error }] = useUpsertProcess({
    onCompleted: () => {
      form.resetFields();
      onClose();
    }
  });

  useShowError(error);

  const handleConfirm = useCallback(() => {
    form.validateFields().then((values: any) => {
      const uuid = createUuid();
      const xml = empertyBpmn.replace("$processId", "Process_" + uuid)
      if (values.categoryUuid) {
        upsert({ name: values.name, uuid, xml, categoryUuid: values.categoryUuid });
      } else {
        upsert({ name: values.name, uuid, xml });
      }
    });
  }, [upsert, form]);

  const handleCancel = useCallback(() => {
    form.resetFields();
    onClose()
  }, [form, onClose]);


  return (
    <Modal
      title={t("AppBpmn.AddProcess")}
      open={isModalVisible}
      cancelText={t("Cancel")}
      okText={t("Confirm")}
      onCancel={handleCancel}
      onOk={handleConfirm}
      confirmLoading={loading}
    >
      <ProcessForm categoryUuid={categoryUuid} categories={categories} form={form} />
    </Modal>
  )
})

export default ProcessModal;
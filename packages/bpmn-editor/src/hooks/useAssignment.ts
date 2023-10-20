import { useCallback, useEffect, useState } from "react";
import { getBusinessObject } from 'bpmn-js/lib/util/ModelUtil';

export function useAssignment(element: any, modeler: any) {
  const [assignment, setAssignment] = useState<any>();
  useEffect(() => {
    if (!modeler || !element) {
      return;
    }
    const businessObject = getBusinessObject(element);
    const assignment = getExtensionElement(businessObject, 'zeebe:AssignmentDefinition');
    setAssignment(assignment)
  }, [element, modeler])

  const updateAssgnment = useCallback((name: string, value: any) => {
    if (!modeler || !element) {
      return;
    }
    const businessObject = getBusinessObject(element);
    const moddle = modeler.get('moddle');
    const modeling = modeler.get('modeling');
    // 获取或者创建一个 ExtensionElements 并更新节点业务属性
    let extensionElements = businessObject.get('extensionElements')
    if (!extensionElements) {
      extensionElements = moddle.create('bpmn:ExtensionElements', { values: [] })
      // 设置 $parent, 指向 业务节点实例的 businessObject
      extensionElements.$parent = businessObject
      // 将 extensionElements 更新到节点上
      modeling.updateModdleProperties(process, businessObject, { extensionElements })
    }

    let assignment = getExtensionElement(businessObject, 'zeebe:AssignmentDefinition');
    if (!assignment) {
      assignment = moddle.create('zeebe:AssignmentDefinition', { [name]: value })
      assignment.$parent = extensionElements
      // 这里注意 values 数组里面需要把原来的数据填充进来
      modeling.updateModdleProperties(element, extensionElements, {
        values: [...extensionElements.get('values'), assignment]
      })
    } else {
      modeling.updateModdleProperties(assignment, getBusinessObject(assignment), { [name]: value })
    }
  }, [element, modeler])

  return [assignment, updateAssgnment];
}

function getExtensionElement(element: any, type: any) {
  if (!element.extensionElements) {
    return;
  }

  return element.extensionElements.values.filter((extensionElement: any) => {
    return extensionElement.$instanceOf(type);
  })[0];
}
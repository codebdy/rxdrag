import { useMemo } from "react";
import { useAssociation } from "./useAssociation";
import { useBusinessRuleTask } from "./useBusinessRuleTask";
import { useCallActivity } from "./useCallActivity";
import { useCollaboration } from "./useCollaboration";
import { useCollapsedSubProcess } from "./useCollapsedSubProcess";
import { useEndEvent } from "./useEndEvent";
import { useEventBasedGateway } from "./useEventBasedGateway";
import { useExclusiveGateway } from "./useExclusiveGateway";
import { useExpandedSubProcess } from "./useExpandedSubProcess";
import { useGroup } from "./useGroup";
import { useInclusiveGateway } from "./useInclusiveGateway";
import { useIntermediateThrowEvent } from "./useIntermediateThrowEvent";
import { useLane } from "./useLane";
import { useManualTask } from "./useManualTask";
import { useParallelGateway } from "./useParallelGateway";
import { useParticipant } from "./useParticipant";
import { useProcess } from "./useProcess";
import { useReceiveTask } from "./useReceiveTask";
import { useScriptTask } from "./useScriptTask";
import { useSendTask } from "./useSendTask";
import { useSequenceFlow } from "./useSequenceFlow";
import { useServiceTask } from "./useServiceTask";
import { useStartEvent } from "./useStartEvent";
import { useTask } from "./useTask";
import { useTextAnnotation } from "./useTextAnnotation";
import { useUserTask } from "./useUserTask";

export function useElementView(element: any, modeler: any) {
  const process = useProcess(element, modeler);
  const collaboration = useCollaboration(element, modeler);
  const startEvent = useStartEvent(element, modeler);
  const intermediateThrowEvent = useIntermediateThrowEvent(element, modeler);
  const endEvent = useEndEvent(element, modeler);
  const exclusiveGateway = useExclusiveGateway(element, modeler);
  const parallelGateway = useParallelGateway(element, modeler);
  const inclusiveGateway = useInclusiveGateway(element, modeler);
  const eventBasedGateway = useEventBasedGateway(element, modeler);
  const task = useTask(element, modeler);
  const sendTask = useSendTask(element, modeler);
  const receiveTask = useReceiveTask(element, modeler);
  const userTask = useUserTask(element, modeler);
  const manualTask = useManualTask(element, modeler);
  const businessRuleTask = useBusinessRuleTask(element, modeler);
  const serviceTask = useServiceTask(element, modeler);
  const scriptTask = useScriptTask(element, modeler);
  const callActivity = useCallActivity(element, modeler);
  const collapsedSubProcess = useCollapsedSubProcess(element, modeler);
  const expandedSubProcess = useExpandedSubProcess(element, modeler);
  const participant = useParticipant(element, modeler);
  const lane = useLane(element, modeler);
  const group = useGroup(element, modeler);
  const annotation = useTextAnnotation(element, modeler);
  const association = useAssociation(element, modeler);
  const sequenceFlow = useSequenceFlow(element, modeler);
  const elementView = useMemo(() => {
    switch (element?.businessObject?.$type) {
      case "bpmn:Process":
        return process;
      case "bpmn:Collaboration":
        return collaboration;
      case "bpmn:StartEvent":
        return startEvent;
      case "bpmn:IntermediateThrowEvent":
        return intermediateThrowEvent;
      case "bpmn:EndEvent":
        return endEvent;
      case "bpmn:ExclusiveGateway":
        return exclusiveGateway;
      case "bpmn:ParallelGateway":
        return parallelGateway;
      case "bpmn:InclusiveGateway":
        return inclusiveGateway;
      case "bpmn:EventBasedGateway":
        return eventBasedGateway;
      case "bpmn:Task":
        return task;
      case "bpmn:SendTask":
        return sendTask;
      case "bpmn:ReceiveTask":
        return receiveTask;
      case "bpmn:UserTask":
        return userTask;
      case "bpmn:ManualTask":
        return manualTask;
      case "bpmn:BusinessRuleTask":
        return businessRuleTask;
      case "bpmn:ServiceTask":
        return serviceTask;
      case "bpmn:ScriptTask":
        return scriptTask;
      case "bpmn:CallActivity":
        return callActivity;
      case "bpmn:SubProcess":
        return element?.collapsed ? collapsedSubProcess : expandedSubProcess;
      case "bpmn:Participant":
        return participant;
      case "bpmn:Lane":
        return lane;
      case "bpmn:Group":
        return group;
      case "bpmn:TextAnnotation":
        return annotation;
      case "bpmn:Association":
        return association;
      case "bpmn:SequenceFlow":
        return sequenceFlow;
    }
  }, [element, process, collaboration, startEvent, intermediateThrowEvent, endEvent, exclusiveGateway, parallelGateway, inclusiveGateway, eventBasedGateway, task, sendTask, receiveTask, userTask, manualTask, businessRuleTask, serviceTask, scriptTask, callActivity, collapsedSubProcess, expandedSubProcess, participant, lane, group, annotation, association, sequenceFlow])

  return elementView
}
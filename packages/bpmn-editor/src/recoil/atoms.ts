import { atomFamily } from "recoil";
import { IProcess, IProcessCategory } from "model";
import { ID } from "shared";

export const selectedBpmnProcessIdState = atomFamily<ID | undefined, string>({
  key: "bpmn.selectedProcessId",
  default: undefined,
});

export const categoriesState = atomFamily<IProcessCategory[], string>({
  key: "bpmn.categories",
  default: [],
});

export const processesState = atomFamily<IProcess[], string>({
  key: "bpmn.processes",
  default: [],
})


export const minMapState = atomFamily<boolean, string>({
  key: "bpmn.minMap",
  default: false,
});
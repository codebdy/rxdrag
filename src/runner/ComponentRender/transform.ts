import { INodeSchema } from "core";
import { makeRxId } from "core/utils/make-rxId";
import { IComponentRenderSchema } from "./ComponentView";

export function transToRenderSchema(node:INodeSchema) :IComponentRenderSchema{
  const slots: {[name: string]: IComponentRenderSchema | undefined} = {}
  for(const key of Object.keys(node.slots||{})){
    const slot = node.slots?.[key];
    if(slot){
      slots[key] = transToRenderSchema(slot)
    }
  }

  return {
    id:makeRxId(),
    ...node,
    children: node?.children?.map(child=>transToRenderSchema(child)),
    slots
  }
}
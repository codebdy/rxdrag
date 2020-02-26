import {OptionFragment} from "../option-fragment"

class ContainerFluid extends OptionFragment{
  constructor(){
    super()
    this.schema = {
      label:'Fluid',
      fieldName: 'classList',
      widget:'OpSwitch',
      group:'containerOptions',
      onValue:'container-fluid',
      offValue:'container',
      defaultValue:'container',
    }

  }
}

var addonFluid = (node, groupName)=>{
  let containerFluid = new ContainerFluid
  containerFluid.addon(node, groupName)
  return containerFluid
}

export {addonFluid}


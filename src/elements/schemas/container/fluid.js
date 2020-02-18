import {OptionFragment} from "../option-fragment"

class ContainerFluid extends OptionFragment{
  constructor(){
    super()
    this.schema = {
      label:'Fluid',
      widget:'OpSwitch',
      required:true,
      group:'containerOptions',
      onValue:'container-fluid',
      offValue:'container',
      defaultValue:'container',
    }

    this.metaFragment = 'container' 

    this.fieldName = 'containerFluid'
  }

  copyMeta(from, to){
    to.containerFluid = from.containerFluid
  }

  toViewModel(model, meta){
    let metaFragment = meta[this.fieldName]
    model.classList.add(metaFragment)
  }
}

var addonFluid = (node, groupName)=>{
  let containerFluid = new ContainerFluid
  containerFluid.addon(node, groupName)
  return containerFluid
}

export {addonFluid}


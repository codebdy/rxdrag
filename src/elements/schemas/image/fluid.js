import {OptionFragment} from "../option-fragment"

class ImageFluid extends OptionFragment{
  constructor(){
    super()
    this.schema = {
      label:'Fluid',
      widget:'OpSwitch',
      group:'imageOptions',
      onValue:'img-fluid',
      offValue:'',
      defaultValue:'',
    }

    this.metaFragment = '' 

    this.fieldName = 'imageFluid'
  }

  copyMeta(from, to){
    to[this.fieldName] = from[this.fieldName]
  }

  metaToModel(model, meta){
    let metaFragment = meta[this.fieldName]
    model.classList.add(metaFragment)
  }
}

var addonImageFluid = (node, groupName)=>{
  let imageFluid = new ImageFluid
  imageFluid.addon(node, groupName)
  return imageFluid
}

export {addonImageFluid}


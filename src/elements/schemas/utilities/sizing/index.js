import {OptionFragment} from "../../option-fragment"

import height from "./height"
import width from "./width"

var utilSizingSchema = {
  group:'utilities',
  label:'Sizing',
  isRowGroup:true,
  fields:{
    width : width,
    height : height,
  }
}

class UtilSizing extends OptionFragment{
  constructor(){
    super()
    this.schema = Object.assign({}, utilSizingSchema)

    this.fieldName = 'utilSizing'
  }

  copyMeta(from, to){
    if(from[this.fieldName]){
      to[this.fieldName] = JSON.parse(JSON.stringify(from[this.fieldName]))

    }
  }

  metaToModel(model, meta){
    let metaFragment = meta[this.fieldName] ? meta[this.fieldName] : {}
    model.classList.add(metaFragment.width)
    model.classList.add(metaFragment.height)
  }
}

var addonUtilSizing = (node, groupName)=>{
  let utilSizing = new UtilSizing
  utilSizing.addon(node, groupName)
  return utilSizing
}

export {addonUtilSizing}

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

var utilSizingMeta = {
  width : '',
  height : '',
}

class UtilSizing extends OptionFragment{
  constructor(){
    super()
    this.schema = Object.assign({}, utilSizingSchema)

    this.metaFragment = Object.assign({}, utilSizingMeta)
    this.fieldName = 'utilSizing'
  }

  copyMeta(from, to){
    to[this.fieldName] = {}
    to[this.fieldName].width = from[this.fieldName].width
    to[this.fieldName].height = from[this.fieldName].height
  }

  toViewModel(model, meta){
    let metaFragment = meta[this.fieldName]
    model.classList.add(metaFragment.width)
    model.classList.add(metaFragment.height)
  }
}

var addonUtilSizing = (node)=>{
  let utilSizing = new UtilSizing
  utilSizing.addon(node)
  return utilSizing
}

export {addonUtilSizing}

import {OptionFragment} from "../option-fragment"
import responsiveMeta from "../responsive"
import utilMarginAutoSchema  from "../utilities/flex/margin-auto" 

class UtilMarginAuto extends OptionFragment{
  constructor(){
    super()
    this.schema = Object.assign({}, utilMarginAutoSchema)
    this.schema.group = 'columnOptions'

    this.metaFragment = Object.assign({}, responsiveMeta) 

    this.fieldName = 'utilMarginAuto'
  }

  copyMeta(from, to){
    super.copyResponsiveMetaTo(from, to)
  }

  toViewModel(model, meta){
    let metaFragment = meta[this.fieldName]
    super.responsiveMetaFieldToViewModel(model, metaFragment)
  }
}

var addonUtilMarginAuto = (node, groupName)=>{
  let utilMarginAuto = new UtilMarginAuto
  utilMarginAuto.addon(node, groupName)
  return utilMarginAuto
}

export {addonUtilMarginAuto}


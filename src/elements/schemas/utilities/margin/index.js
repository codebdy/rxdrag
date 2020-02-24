import {OptionFragment} from "../../option-fragment"
import marginAll from "./margin-all"
import marginH from "./margin-h"
import marginV from "./margin-v"
import marginTop from "./margin-t"
import marginBottom from "./margin-b"
import marginLeft from "./margin-l"
import marginRight from "./margin-r"

var utilMarginSchema = {
  group:'utilities',
  label:'Margin',
  isRowGroup:true,
  fields:{
  	all : marginAll,
  	horizontal : marginH,
  	vertical : marginV,
  	top : marginTop,
    right : marginRight,
  	bottom : marginBottom,
  	left : marginLeft,
  }
}

class UtilMargin extends OptionFragment{
  constructor(){
    super()
    this.schema = Object.assign({}, utilMarginSchema)

    this.fieldName = 'utilMargin'
  }

  copyMeta(from, to){
    super.copyResponsiveGroupMetasTo(from[this.fieldName], to[this.fieldName])
  }

  metaToModel(model, meta){
    super.responsiveMetaGroupToViewModel(model, meta[this.fieldName])
  }
}

var addonUtilMargin = (node, groupName)=>{
  let utilMargin = new UtilMargin
  utilMargin.addon(node, groupName)
  return utilMargin
}

export {addonUtilMargin}

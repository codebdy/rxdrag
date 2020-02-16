import {OptionFragment} from "../../option-fragment"
import marginAll from "./margin-all"
import marginH from "./margin-h"
import marginV from "./margin-v"
import marginTop from "./margin-t"
import marginBottom from "./margin-b"
import marginLeft from "./margin-l"
import marginRight from "./margin-r"
import responsiveMeta from "../../responsive"

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

var utilMarginMeta = {
  all : Object.assign({}, responsiveMeta),
  horizontal : Object.assign({}, responsiveMeta),
  vertical : Object.assign({}, responsiveMeta),
  top : Object.assign({}, responsiveMeta),
  right : Object.assign({}, responsiveMeta),
  bottom : Object.assign({}, responsiveMeta),
  left : Object.assign({}, responsiveMeta),
}

class UtilMargin extends OptionFragment{
  constructor(){
    super()
    this.schema = Object.assign({}, utilMarginSchema)

    this.metaFragment = Object.assign({}, utilMarginMeta)
    this.fieldName = 'utilMargin'
  }

  copyMeta(from, to){
    super.copyResponsiveGroupMetasTo(from[this.fieldName], to[this.fieldName])
  }

  toViewModel(model, meta){
    super.responsiveMetaGroupToViewModel(model, meta[this.fieldName])
  }
}

var addonUtilMargin = (node)=>{
  let utilMargin = new UtilMargin
  utilMargin.addon(node)
  return utilMargin
}

export {addonUtilMargin}

import {OptionFragment} from "../../option-fragment"

import paddingAll from "./padding-all"
import paddingH from "./padding-h"
import paddingV from "./padding-v"
import paddingTop from "./padding-t"
import paddingBottom from "./padding-b"
import paddingLeft from "./padding-l"
import paddingRight from "./padding-r"

var utilPaddingSchema = {
  group:'utilities',
  label:'Padding',
  isRowGroup:true,
  fields:{
    all : paddingAll,
    horizontal : paddingH,
    vertical : paddingV,
    top : paddingTop,
    right : paddingRight,
    bottom : paddingBottom,
    left : paddingLeft,
  }
}

class UtilPadding extends OptionFragment{
  constructor(){
    super()
    this.schema = Object.assign({}, utilPaddingSchema)

    this.fieldName = 'utilPadding'
  }

  copyMeta(from, to){
    super.copyResponsiveGroupMetasTo(from[this.fieldName], to[this.fieldName])
  }

  metaToModel(model, meta){
    super.responsiveMetaGroupToViewModel(model, meta[this.fieldName])
  }
}

var addonUtilPadding = (node, groupName)=>{
  let utilPadding = new UtilPadding
  utilPadding.addon(node, groupName)
  return utilPadding
}

export {addonUtilPadding}

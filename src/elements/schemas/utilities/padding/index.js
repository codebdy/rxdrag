import {OptionFragment} from "../../option-fragment"

import paddingAll from "./padding-all"
import paddingH from "./padding-h"
import paddingV from "./padding-v"
import paddingTop from "./padding-t"
import paddingBottom from "./padding-b"
import paddingLeft from "./padding-l"
import paddingRight from "./padding-r"
import responsiveMeta from "../../responsive"

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

var utilPaddingMeta = {
  all : Object.assign({}, responsiveMeta),
  horizontal : Object.assign({}, responsiveMeta),
  vertical : Object.assign({}, responsiveMeta),
  top : Object.assign({}, responsiveMeta),
  right : Object.assign({}, responsiveMeta),
  bottom : Object.assign({}, responsiveMeta),
  left : Object.assign({}, responsiveMeta),
}

export class UtilPadding extends OptionFragment{
  constructor(){
    super()
    this.schema = Object.assign({}, utilPaddingSchema)

    this.metaFragment = Object.assign({}, utilPaddingMeta)
    this.fieldName = 'utilPadding'
  }

  copyMeta(from, to){
    super.copyResponsiveGroupMetasTo(from[this.fieldName], from[to.fieldName])
  }

  toViewModel(model, meta){
    super.responsiveMetaGroupToViewModel(model, meta[this.fieldName])
  }
}

import {OptionFragment} from "../../option-fragment"
import responsiveMeta from "../../responsive"
import alignContent from "./align-content"
import alignItems from "./align-items"
import alignSelf from "./align-self"
import direction from "./direction"
import display from "./display"
import fill from "./fill"
import grow from "./grow"
import justifyContent from "./justify-content"
import marginAuto from "./margin-auto"
import order from "./order"
import shrink from "./shrink"
import wrap from "./wrap"


var utilFlexSchema = {
  group:'utilities',
  label:'Flex',
  isRowGroup:true,
  fields:{
    display : display,
    direction : direction,
    justifyContent : justifyContent,
    alignItems : alignItems,
    alignSelf : alignSelf,
    fill : fill,
    grow : grow,
    shrink : shrink,
    marginAuto : marginAuto,
    wrap : wrap,
    order : order,
    alignContent : alignContent,
  }
}

var utilFlexMeta = {
    display : Object.assign({}, responsiveMeta),
    direction : Object.assign({}, responsiveMeta),
    justifyContent : Object.assign({}, responsiveMeta),
    alignItems : Object.assign({}, responsiveMeta),
    alignSelf : Object.assign({}, responsiveMeta),
    fill : Object.assign({}, responsiveMeta),
    grow : Object.assign({}, responsiveMeta),
    shrink : Object.assign({}, responsiveMeta),
    marginAuto : Object.assign({}, responsiveMeta),
    wrap : Object.assign({}, responsiveMeta),
    order : Object.assign({}, responsiveMeta),
    alignContent : Object.assign({}, responsiveMeta),
}

class UtilFlex extends OptionFragment{
  constructor(){
    super()
    this.schema = Object.assign({}, utilFlexSchema)

    this.metaFragment = Object.assign({}, utilFlexMeta)
    this.fieldName = 'utilFlex'
  }

  copyMeta(from, to){
    super.copyResponsiveGroupMetasTo(from[this.fieldName], to[this.fieldName])
  }

  toViewModel(model, meta){
    super.responsiveMetaGroupToViewModel(model, meta[this.fieldName])
  }
}

var addonUtilFlex = (node, groupName)=>{
  let utilFlex = new UtilFlex
  utilFlex.addon(node, groupName)
  return utilFlex
}

export {addonUtilFlex}

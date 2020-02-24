import {OptionFragment} from "../../option-fragment"
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

class UtilFlex extends OptionFragment{
  constructor(){
    super()
    this.schema = Object.assign({}, utilFlexSchema)

    this.fieldName = 'utilFlex'
  }

  copyMeta(from, to){
    super.copyResponsiveGroupMetasTo(from[this.fieldName], to[this.fieldName])
  }

  metaToModel(model, meta){
    super.responsiveMetaGroupToViewModel(model, meta[this.fieldName])
  }
}

var addonUtilFlex = (node, groupName)=>{
  let utilFlex = new UtilFlex
  utilFlex.addon(node, groupName)
  return utilFlex
}

export {addonUtilFlex}

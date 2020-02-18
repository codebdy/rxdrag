import {OptionFragment} from "../option-fragment"
import responsiveMeta from "../responsive"
import colOrderSchema  from "../utilities/flex/order" 

class ColOrder extends OptionFragment{
  constructor(){
    super()
    this.schema = Object.assign({}, colOrderSchema)

    this.metaFragment = Object.assign({}, responsiveMeta) 

    this.fieldName = 'colOrder'
  }

  copyMeta(from, to){
    super.copyResponsiveMetaTo(from, to)
  }

  toViewModel(model, meta){
    let metaFragment = meta[this.fieldName]
    super.responsiveMetaFieldToViewModel(model, metaFragment)
  }
}

var addonOrder = (node, groupName)=>{
  let colOrder = new ColOrder
  colOrder.addon(node, groupName)
  return colOrder
}

export {addonOrder}

import {OptionFragment} from "../option-fragment"
import responsiveMeta from "../responsive"
import rowAlignItemsSchema  from "../utilities/flex/align-items" 

class RowAlignItems extends OptionFragment{
  constructor(){
    super()
    this.schema = Object.assign({}, rowAlignItemsSchema)
    this.schema.group = 'rowOptions'

    this.metaFragment = Object.assign({}, responsiveMeta) 

    this.fieldName = 'utilAlignItems'
  }

  copyMeta(from, to){
    super.copyResponsiveMetaTo(from, to)
  }

  toViewModel(model, meta){
    let metaFragment = meta[this.fieldName]
    super.responsiveMetaFieldToViewModel(model, metaFragment)
  }
}

var addonRowAlignItems = (node)=>{
  let rowAlignItems = new RowAlignItems
  rowAlignItems.addon(node)
  return rowAlignItems
}

export {addonRowAlignItems}


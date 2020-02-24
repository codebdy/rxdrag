import {OptionFragment} from "../option-fragment"
import rowAlignItemsSchema  from "../utilities/flex/align-items" 

class RowAlignItems extends OptionFragment{
  constructor(){
    super()
    this.schema = Object.assign({}, rowAlignItemsSchema)
    this.schema.group = 'rowOptions'

    this.fieldName = 'utilAlignItems'
  }

  copyMeta(from, to){
    super.copyResponsiveMetaTo(from, to)
  }

  metaToModel(model, meta){
    let metaFragment = meta[this.fieldName]
    super.responsiveMetaFieldToViewModel(model, metaFragment)
  }
}

var addonRowAlignItems = (node, groupName)=>{
  let rowAlignItems = new RowAlignItems
  rowAlignItems.addon(node, groupName)
  return rowAlignItems
}

export {addonRowAlignItems}


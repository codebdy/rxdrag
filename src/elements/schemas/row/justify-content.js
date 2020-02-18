import {OptionFragment} from "../option-fragment"
import responsiveMeta from "../responsive"
import utilJustifyContentSchema from "../utilities/flex/justify-content" 

class RowJustifyContent extends OptionFragment{
  constructor(){
    super()
    this.schema = Object.assign({}, utilJustifyContentSchema)
    this.schema.group = 'rowOptions'

    this.metaFragment = Object.assign({}, responsiveMeta) 

    this.fieldName = 'rowJustifyContent'
  }

  copyMeta(from, to){
    super.copyResponsiveMetaTo(from, to)
  }

  toViewModel(model, meta){
    let metaFragment = meta[this.fieldName]
    super.responsiveMetaFieldToViewModel(model, metaFragment)
  }
}

var addonRowJustifyContent = (node, groupName)=>{
  let rowJustifyContent = new RowJustifyContent
  rowJustifyContent.addon(node, groupName)
  return rowJustifyContent
}

export {addonRowJustifyContent}


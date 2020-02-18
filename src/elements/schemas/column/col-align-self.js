import {OptionFragment} from "../option-fragment"
import responsiveMeta from "../responsive"
import colAlignSelfSchema  from "../utilities/flex/align-self" 

class ColAlignSelf extends OptionFragment{
  constructor(){
    super()
    this.schema = Object.assign({}, colAlignSelfSchema)

    this.metaFragment = Object.assign({}, responsiveMeta) 

    this.fieldName = 'colAlignSelf'
  }

  copyMeta(from, to){
    super.copyResponsiveMetaTo(from, to)
  }

  toViewModel(model, meta){
    let metaFragment = meta[this.fieldName]
    super.responsiveMetaFieldToViewModel(model, metaFragment)
  }
}

var addonAlignSelf = (node, groupName)=>{
  let colAlignSelf = new ColAlignSelf
  colAlignSelf.addon(node, groupName)
  return colAlignSelf
}

export {addonAlignSelf}

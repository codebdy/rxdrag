import {OptionFragment} from "../option-fragment"
import colAlignSelfSchema  from "../utilities/flex/align-self" 

class ColAlignSelf extends OptionFragment{
  constructor(){
    super()
    this.schema = Object.assign({}, colAlignSelfSchema)

    this.fieldName = 'colAlignSelf'
  }

  copyMeta(from, to){
    super.copyResponsiveMetaTo(from, to)
  }

  metaToModel(model, meta){
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

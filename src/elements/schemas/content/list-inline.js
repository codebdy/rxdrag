import {OptionFragment} from "../option-fragment"

class TypyListInline extends OptionFragment{
  constructor(){
    super()
    this.schema = {
      label:'List inline',
      widget:'OpSwitch',
      group:'typographyOptions',
      onValue:'list-inline',
      offValue:'',
      defaultValue:'',
    }

    this.metaFragment = '' 

    this.fieldName = 'typyListInline'
  }

  copyMeta(from, to){
    to[this.fieldName] = from[this.fieldName]
  }

  metaToModel(model, meta){
    let metaFragment = meta[this.fieldName]
    model.classList.add(metaFragment)
  }
}

var addonTypyListInline = (node, groupName)=>{
  let typyListInline = new TypyListInline
  typyListInline.addon(node, groupName)
  return typyListInline
}

export {addonTypyListInline}


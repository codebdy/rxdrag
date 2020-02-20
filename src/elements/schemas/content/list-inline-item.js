import {OptionFragment} from "../option-fragment"

class TypyListInlineItem extends OptionFragment{
  constructor(){
    super()
    this.schema = {
      label:'Inline item',
      widget:'OpSwitch',
      group:'typographyOptions',
      onValue:'list-inline-item',
      offValue:'',
      defaultValue:'',
    }

    this.metaFragment = '' 

    this.fieldName = 'typyListInlineItem'
  }

  copyMeta(from, to){
    to[this.fieldName] = from[this.fieldName]
  }

  metaToModel(model, meta){
    let metaFragment = meta[this.fieldName]
    model.classList.add(metaFragment)
  }
}

var addonTypyListInlineItem = (node, groupName)=>{
  let typyListInlineItem = new TypyListInlineItem
  typyListInlineItem.addon(node, groupName)
  return typyListInlineItem
}

export {addonTypyListInlineItem}


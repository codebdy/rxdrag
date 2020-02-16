import {OptionFragment} from "../../option-fragment"

class UtilResponsiveItem extends OptionFragment{
  constructor(){
    super()
    this.schema = {
      label:'Embed Item',
      widget:'OpSwitch',
      required:true,
      group:'utilities',
      onValue:'embed-responsive-item',
      offValue:'',
      defaultValue:'',
    }

    this.metaFragment = '' 

    this.fieldName = 'utilResponsiveItem'
  }

  copyMeta(from, to){
    to.utilResponsiveItem = from.utilResponsiveItem
  }

  toViewModel(model, meta){
    let metaFragment = meta[this.fieldName]
    model.classList.add(metaFragment)
  }
}

var addonUtilResponsiveItem = (node)=>{
  let utilResponsiveItem = new UtilResponsiveItem
  utilResponsiveItem.addon(node)
  return utilResponsiveItem
}

export {addonUtilResponsiveItem}


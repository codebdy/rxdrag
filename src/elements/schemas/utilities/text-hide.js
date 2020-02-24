import {OptionFragment} from "../option-fragment"

class UtilTextHide extends OptionFragment{
  constructor(){
    super()
    this.schema = {
      label:'Text Hide',
      widget:'OpSwitch',
      group:'utilities',
      onValue:'text-hide',
      offValue:'',
      defaultValue:'',
    }

    this.fieldName = 'utilTextHide'
  }

  copyMeta(from, to){
    to.utilTextHide = from.utilTextHide
  }

  metaToModel(model, meta){
    let metaFragment = meta[this.fieldName]
    model.classList.add(metaFragment)
  }
}

var addonUtilTextHide = (node, groupName)=>{
  let utilTextHide = new UtilTextHide
  utilTextHide.addon(node, groupName)
  return utilTextHide
}

export {addonUtilTextHide}


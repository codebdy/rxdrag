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

    this.metaFragment = '' 

    this.fieldName = 'utilTextHide'
  }

  copyMeta(from, to){
    to.utilTextHide = from.utilTextHide
  }

  toViewModel(model, meta){
    let metaFragment = meta[this.fieldName]
    model.classList.add(metaFragment)
  }
}

var addonUtilTextHide = (node)=>{
  let utilTextHide = new UtilTextHide
  utilTextHide.addon(node)
  return utilTextHide
}

export {addonUtilTextHide}


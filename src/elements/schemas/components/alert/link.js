import {OptionFragment} from "../../option-fragment"

class AlertLink extends OptionFragment{
  constructor(){
    super()
    this.schema = {
      label:'Alert Link',
      widget:'OpSwitch',
      group:'generalOptions',
      onValue:'alert-link',
      offValue:'',
      defaultValue:'',
    }

    this.metaFragment = '' 

    this.fieldName = 'alertLink'
  }

  copyMeta(from, to){
    to[this.fieldName] = from[this.fieldName]
  }

  metaToModel(model, meta){
    let metaFragment = meta[this.fieldName]
    model.classList.add(metaFragment)
  }
}

var addonAlertLink = (node, groupName)=>{
  let alertLink = new AlertLink
  alertLink.addon(node, groupName)
  return alertLink
}

export {addonAlertLink}


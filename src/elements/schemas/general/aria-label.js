import {OptionFragment} from "../option-fragment"

class AriaLabel extends OptionFragment{
  constructor(){
    super()
    this.schema = {
      label:'Aria Label',
      widget:'OpTextField',
      group:'generalOptions',
      defaultValue:'',
    }

    this.fieldName = 'ariaLabel'
  }

  copyMeta(from, to){
    to[this.fieldName] = from[this.fieldName]
  }

  metaToModel(model, meta){
    let metaFragment = meta[this.fieldName]
    model.attributes['aria-label'] = metaFragment
  }
}

var addonAriaLabel = (node, groupName)=>{
  let ariaLabel = new AriaLabel
  ariaLabel.addon(node, groupName)
  return ariaLabel
}

export {addonAriaLabel}


import {OptionFragment} from "../../option-fragment"

class BadgePill extends OptionFragment{
  constructor(){
    super()
    this.schema = {
      label:'Badge Pill',
      widget:'OpSwitch',
      group:'badgeOptions',
      onValue:'badge-pill',
      offValue:'',
      defaultValue:'',
    }

    this.metaFragment = '' 

    this.fieldName = 'badgePill'
  }

  copyMeta(from, to){
    to[this.fieldName] = from[this.fieldName]
  }

  metaToModel(model, meta){
    let metaFragment = meta[this.fieldName]
    model.classList.add(metaFragment)
  }
}

var addonBadgePill = (node, groupName)=>{
  let badgePill = new BadgePill
  badgePill.addon(node, groupName)
  return badgePill
}

export {addonBadgePill}


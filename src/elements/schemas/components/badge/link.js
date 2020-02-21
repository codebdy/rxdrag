import {OptionFragment} from "../../option-fragment"

class BadgeLink extends OptionFragment{
  constructor(){
    super()
    this.schema = {
      label:'Link',
      widget:'OpSwitch',
      group:'badgeOptions',
      onValue:'a',
      offValue:'span',
      defaultValue:'span',
    }

    this.metaFragment = '' 

    this.fieldName = 'tag'
  }

  copyMeta(from, to){
    to[this.fieldName] = from[this.fieldName]
  }

  metaToModel(model, meta){
    //let metaFragment = meta[this.fieldName]
    //model.name = metaFragment
  }
}

var addonBadgeLink = (node, groupName)=>{
  let badgeLink = new BadgeLink
  badgeLink.addon(node, groupName)
  return badgeLink
}

export {addonBadgeLink}


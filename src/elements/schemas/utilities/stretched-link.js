import {OptionFragment} from "../option-fragment"

class UtilStretchedLink extends OptionFragment{
  constructor(){
    super()
    this.schema = {
      label:'Stretched Link',
      widget:'OpSwitch',
      group:'utilities',
      onValue:'stretched-link',
      offValue:'',
      defaultValue:'',
    }

    this.metaFragment = '' 

    this.fieldName = 'utilStretchedLink'
  }

  copyMeta(from, to){
    to.utilStretchedLink = from.utilStretchedLink
  }

  metaToModel(model, meta){
    let metaFragment = meta[this.fieldName]
    model.classList.add(metaFragment)
  }
}

var addonUtilStretchedLink = (node, groupName)=>{
  let utilStretchedLink = new UtilStretchedLink
  utilStretchedLink.addon(node, groupName)
  return utilStretchedLink
}

export {addonUtilStretchedLink}


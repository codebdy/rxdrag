import {OptionFragment} from "../option-fragment"

class TypyLead extends OptionFragment{
  constructor(){
    super()
    this.schema = {
      label:'Lead',
      widget:'OpSwitch',
      required:true,
      group:'typographyOptions',
      onValue:'lead',
      offValue:'',
      defaultValue:'',
    }

    this.metaFragment = '' 

    this.fieldName = 'typyLead'
  }

  copyMeta(from, to){
    to[this.fieldName] = from[this.fieldName]
  }

  metaToModel(model, meta){
    let metaFragment = meta[this.fieldName]
    model.classList.add(metaFragment)
  }
}

var addonTypyLead = (node, groupName)=>{
  let typyLead = new TypyLead
  typyLead.addon(node, groupName)
  return typyLead
}

export {addonTypyLead}


import {OptionFragment} from "../option-fragment"

class TypyInitialism extends OptionFragment{
  constructor(){
    super()
    this.schema = {
      label:'Initialism',
      widget:'OpSwitch',
      required:true,
      group:'typographyOptions',
      onValue:'initialism',
      offValue:'',
      defaultValue:'',
    }

    this.metaFragment = '' 

    this.fieldName = 'typyInitialism'
  }

  copyMeta(from, to){
    to.typyInitialism = from.typyInitialism
  }

  metaToModel(model, meta){
    let metaFragment = meta[this.fieldName]
    model.classList.add(metaFragment)
  }
}

var addonTypyInitialism = (node, groupName)=>{
  let typyInitialism = new TypyInitialism
  typyInitialism.addon(node, groupName)
  return typyInitialism
}

export {addonTypyInitialism}


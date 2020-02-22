import {OptionFragment} from "../../option-fragment"

class ButtonDisabled extends OptionFragment{
  constructor(){
    super()
    this.schema = {
      label:'Disabled',
      widget:'OpSwitch',
      group:'buttonOptions',
      onValue:'disabled',
      offValue:'',
      defaultValue:'',
    }

    this.metaFragment = '' 

    this.fieldName = 'buttonDisabled'
  }

  copyMeta(from, to){
    to[this.fieldName] = from[this.fieldName]
  }

  metaToModel(model, meta){
    let metaFragment = meta[this.fieldName]
    model.classList.add(metaFragment)
  }
}

var addonButtonDisabled = (node, groupName)=>{
  let buttonDisabled = new ButtonDisabled
  buttonDisabled.addon(node, groupName)
  return buttonDisabled
}

export {addonButtonDisabled}


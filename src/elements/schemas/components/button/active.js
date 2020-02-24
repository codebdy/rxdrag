import {OptionFragment} from "../../option-fragment"

class ButtonActive extends OptionFragment{
  constructor(){
    super()
    this.schema = {
      label:'Active',
      widget:'OpSwitch',
      group:'buttonOptions',
      onValue:'active',
      offValue:'',
      defaultValue:'',
    }

    this.fieldName = 'buttonActive'
  }

  copyMeta(from, to){
    to[this.fieldName] = from[this.fieldName]
  }

  metaToModel(model, meta){
    let metaFragment = meta[this.fieldName]
    model.classList.add(metaFragment)
  }
}

var addonButtonActive = (node, groupName)=>{
  let buttonActive = new ButtonActive
  buttonActive.addon(node, groupName)
  return buttonActive
}

export {addonButtonActive}


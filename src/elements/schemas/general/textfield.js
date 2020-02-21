import {OptionFragment} from "../option-fragment"

class GeneralTextfield extends OptionFragment{
  constructor(){
    super()
    this.schema = {
      label:'Textfield',
      widget:'OpSwitch',
      group:'generalOptions',
      onValue:'contentEditable',
      offValue:'',
      defaultValue:'',
    }

    this.metaFragment = '' 

    this.fieldName = 'generalTextfield'
  }

  copyMeta(from, to){
    to[this.fieldName] = from[this.fieldName]
  }

  metaToModel(model, meta){
    //let metaFragment = meta[this.fieldName]
    //model.classList.add(metaFragment)
    if(meta[this.fieldName] !== 'contentEditable'){
      model.innerHTML = ''
    }
  }
}

var addonGeneralTextfield = (node, groupName)=>{
  let generalTextfield = new GeneralTextfield
  generalTextfield.addon(node, groupName)
  return generalTextfield
}

export {addonGeneralTextfield}


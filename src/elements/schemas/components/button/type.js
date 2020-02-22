import {OptionFragment} from "../../option-fragment"

let buttonTypeSchema = {
  label:'Type',
  group:'buttonOptions',
  widget:'OpSelect',
  defaultValue:'',
  list:{
    'button':'Button',
    'submit':'Submit',
    'reset':'Reset',
  },
}

class ButtonType extends OptionFragment{
  constructor(){
    super()
    this.schema = Object.assign({}, buttonTypeSchema)

    this.metaFragment = '' 

    this.fieldName = 'buttonType'
  }

  copyMeta(from, to){
    to[this.fieldName] = from[this.fieldName]
  }

  metaToModel(model, meta){
    model.attributes['type'] = meta[this.fieldName]
    //model.classList.add(meta[this.fieldName])
  }
}

var addonButtonType = (node, groupName)=>{
  let buttonType = new ButtonType
  buttonType.addon(node, groupName)
  return buttonType
}

export {addonButtonType}


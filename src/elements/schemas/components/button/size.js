import {OptionFragment} from "../../option-fragment"

let buttonSizeSchema = {
  label:'Size',
  group:'buttonOptions',
  widget:'OpSelect',
  defaultValue:'',
  list:{
    'btn-lg':'Large',
    'btn-sm':'Small',
  },
}

class ButtonSize extends OptionFragment{
  constructor(){
    super()
    this.schema = Object.assign({}, buttonSizeSchema)

    this.metaFragment = '' 

    this.fieldName = 'buttonSize'
  }

  copyMeta(from, to){
    to[this.fieldName] = from[this.fieldName]
  }

  metaToModel(model, meta){
    model.classList.add(meta[this.fieldName])
  }
}

var addonButtonSize = (node, groupName)=>{
  let buttonSize = new ButtonSize
  buttonSize.addon(node, groupName)
  return buttonSize
}

export {addonButtonSize}


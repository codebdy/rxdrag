import {OptionFragment} from "../../option-fragment"

let buttonContextualSchema = {
  label:'Contextual',
  group:'buttonOptions',
  widget:'OpSelect',
  defaultValue:'',
  list:{
    'btn-primary':'Primary',
    'btn-secondary':'Secondary',
    'btn-success':'Success',
    'btn-danger':'Danger',
    'btn-warning':'Warning',
    'btn-info':'Info',
    'btn-light':'Light',
    'btn-dark':'Dark',

    'btn-outline-primary':'Outline Primary',
    'btn-outline-secondary':'Outline Secondary',
    'btn-outline-success':'Outline Success',
    'btn-outline-danger':'Outline Danger',
    'btn-outline-warning':'Outline Warning',
    'btn-outline-info':'Outline Info',
    'btn-outline-light':'Outline Light',
    'btn-outline-dark':'Outline Dark',
  },
}

class ButtonContextual extends OptionFragment{
  constructor(){
    super()
    this.schema = Object.assign({}, buttonContextualSchema)

    this.fieldName = 'buttonContextual'
  }

  copyMeta(from, to){
    to[this.fieldName] = from[this.fieldName]
  }

  metaToModel(model, meta){
    model.classList.add(meta[this.fieldName])
  }
}

var addonButtonContextual = (node, groupName)=>{
  let buttonContextual = new ButtonContextual
  buttonContextual.addon(node, groupName)
  return buttonContextual
}

export {addonButtonContextual}


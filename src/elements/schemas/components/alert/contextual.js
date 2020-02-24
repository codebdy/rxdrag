import {OptionFragment} from "../../option-fragment"

let alertContextualSchema = {
  label:'Contextual',
  group:'alertOptions',
  widget:'OpSelect',
  defaultValue:'',
  list:{
    'alert-primary':'Primary',
    'alert-secondary':'Secondary',
    'alert-success':'Success',
    'alert-danger':'Danger',
    'alert-warning':'Warning',
    'alert-info':'Info',
    'alert-light':'Light',
    'alert-dark':'Dark',
  },
}

class AlertContextual extends OptionFragment{
  constructor(){
    super()
    this.schema = Object.assign({}, alertContextualSchema)

    this.fieldName = 'alertContextual'
  }

  copyMeta(from, to){
    to[this.fieldName] = from[this.fieldName]
  }

  metaToModel(model, meta){
    model.classList.add(meta[this.fieldName])
  }
}

var addonAlertContextual = (node, groupName)=>{
  let alertContextual = new AlertContextual
  alertContextual.addon(node, groupName)
  return alertContextual
}

export {addonAlertContextual}


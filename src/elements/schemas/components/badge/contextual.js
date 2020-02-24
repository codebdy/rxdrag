import {OptionFragment} from "../../option-fragment"

let badgeContextualSchema = {
  label:'Contextual',
  group:'badgeOptions',
  widget:'OpSelect',
  defaultValue:'',
  list:{
    'badge-primary':'Primary',
    'badge-secondary':'Secondary',
    'badge-success':'Success',
    'badge-danger':'Danger',
    'badge-warning':'Warning',
    'badge-info':'Info',
    'badge-light':'Light',
    'badge-dark':'Dark',
  },
}

class BadgeContextual extends OptionFragment{
  constructor(){
    super()
    this.schema = Object.assign({}, badgeContextualSchema)

    this.fieldName = 'badgeContextual'
  }

  copyMeta(from, to){
    to[this.fieldName] = from[this.fieldName]
  }

  metaToModel(model, meta){
    model.classList.add(meta[this.fieldName])
  }
}

var addonBadgeContextual = (node, groupName)=>{
  let badgeContextual = new BadgeContextual
  badgeContextual.addon(node, groupName)
  return badgeContextual
}

export {addonBadgeContextual}


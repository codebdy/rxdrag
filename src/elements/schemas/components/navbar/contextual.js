import {OptionFragment} from "../../option-fragment"

let navbarContextualSchema = {
  label:'Contextual',
  group:'navbarOptions',
  widget:'OpSelect',
  defaultValue:'',
  list:{
    'navbar-light':'Light',
    'navbar-dark':'Dark',
  },
}

class NavbarContextual extends OptionFragment{
  constructor(){
    super()
    this.schema = Object.assign({}, navbarContextualSchema)

    this.fieldName = 'navbarContextual'
  }

  copyMeta(from, to){
    to[this.fieldName] = from[this.fieldName]
  }

  metaToModel(model, meta){
    model.classList.add(meta[this.fieldName])
  }
}

var addonNavbarContextual = (node, groupName)=>{
  let navbarContextual = new NavbarContextual
  navbarContextual.addon(node, groupName)
  return navbarContextual
}

export {addonNavbarContextual}


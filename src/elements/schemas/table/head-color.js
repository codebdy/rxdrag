import {OptionFragment} from "../option-fragment"

let theadColorSchema = {
  label:'Contextual',
  group:'theadOptions',
  widget:'OpSelect',
  defaultValue:'',
  list:{
    'thead-dark':'Dark',
    'thead-light':'Light',
  },
}

class TheadColor extends OptionFragment{
  constructor(){
    super()
    this.schema = Object.assign({}, theadColorSchema)

    this.fieldName = 'theadColor'
  }

  copyMeta(from, to){
    to[this.fieldName] = from[this.fieldName]
  }

  metaToModel(model, meta){
    model.classList.add(meta[this.fieldName])
  }
}

var addonTheadColor = (node, groupName)=>{
  let theadColor = new TheadColor
  theadColor.addon(node, groupName)
  return theadColor
}

export {addonTheadColor}


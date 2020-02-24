import {OptionFragment} from "../../option-fragment"

let buttonTagSchema = {
  label:'Tag',
  group:'buttonOptions',
  widget:'OpSelect',
  required:true,
  defaultValue:'button',
  list:{
    'a':'A',
    'button':'Button',
    'input':'Input',
  },
}

class ButtonTag extends OptionFragment{
  constructor(){
    super()
    this.schema = Object.assign({}, buttonTagSchema)

    this.fieldName = 'tag'
  }

  copyMeta(from, to){
    to[this.fieldName] = from[this.fieldName]
  }

  metaToModel(model, meta){
    //model.classList.add(meta[this.fieldName])
  }
}

var addonButtonTag = (node, groupName)=>{
  let buttonTag = new ButtonTag
  buttonTag.addon(node, groupName)
  return buttonTag
}

export {addonButtonTag}


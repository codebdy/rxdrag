import {OptionFragment} from "../option-fragment"

let headingTagSchema = {
  label:'Heading',
  group:'headingOptions',
  widget:'ButtonGroup',
  defaultValue:'h2',
  buttons:{
    'h1':'H1',
    'h2':'H2',
    'h3':'H3',
    'h4':'H4',
    'h5':'H5',
    'h6':'H6',
  },
}

class HeadingTag extends OptionFragment{
  constructor(){
    super()
    this.schema = Object.assign({}, headingTagSchema)
    this.fieldName = 'tag'
  }

  copyMeta(from, to){
  }

  metaToModel(model, meta){
  }
}

var addonHeadingTag = (node, groupName)=>{
  let headingTag = new HeadingTag
  headingTag.addon(node, groupName)
  return headingTag
}

export {addonHeadingTag}


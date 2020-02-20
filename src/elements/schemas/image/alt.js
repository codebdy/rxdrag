import {OptionFragment} from "../option-fragment"

class ImageAlt extends OptionFragment{
  constructor(){
    super()
    this.schema = {
      label:'Alt',
      widget:'OpTextField',
      group:'imageOptions',
      defaultValue:'',
    }

    this.metaFragment = '' 

    this.fieldName = 'imageAlt'
  }

  copyMeta(from, to){
    to[this.fieldName] = from[this.fieldName]
  }

  metaToModel(model, meta){
    let metaFragment = meta[this.fieldName]
    model.classList.add(metaFragment)
  }
}

var addonImageAlt = (node, groupName)=>{
  let imageAlt = new ImageAlt
  imageAlt.addon(node, groupName)
  return imageAlt
}

export {addonImageAlt}


import {OptionFragment} from "../option-fragment"

class ImageSrc extends OptionFragment{
  constructor(){
    super()
    this.schema = {
      label:'Src',
      widget:'OpImageSelect',
      group:'imageOptions',
      defaultValue:'',
    }

    this.fieldName = 'imageSrc'
  }

  copyMeta(from, to){
    to[this.fieldName] = from[this.fieldName]
  }

  metaToModel(model, meta){
    let metaFragment = meta[this.fieldName]
    model.attributes.src = metaFragment
  }
}

var addonImageSrc = (node, groupName)=>{
  let imageSrc = new ImageSrc
  imageSrc.addon(node, groupName)
  return imageSrc
}

export {addonImageSrc}


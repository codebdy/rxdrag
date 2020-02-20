import {OptionFragment} from "../option-fragment"

class ImageSrcset extends OptionFragment{
  constructor(){
    super()
    this.schema = {
      label:'Srcset',
      widget:'OpTextField',
      group:'imageOptions',
      defaultValue:'',
    }

    this.metaFragment = '' 

    this.fieldName = 'imageSrcset'
  }

  copyMeta(from, to){
    to[this.fieldName] = from[this.fieldName]
  }

  metaToModel(model, meta){
    let metaFragment = meta[this.fieldName]
    model.attributes.srcset = metaFragment
  }
}

var addonImageSrcset = (node, groupName)=>{
  let imageSrcset = new ImageSrcset
  imageSrcset.addon(node, groupName)
  return imageSrcset
}

export {addonImageSrcset}


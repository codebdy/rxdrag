import {OptionFragment} from "../option-fragment"

class ImageThumbnail extends OptionFragment{
  constructor(){
    super()
    this.schema = {
      label:'Thumbnail',
      widget:'OpSwitch',
      group:'imageOptions',
      onValue:'img-thumbnail',
      offValue:'',
      defaultValue:'',
    }

    this.fieldName = 'imageThumbnail'
  }

  copyMeta(from, to){
    to[this.fieldName] = from[this.fieldName]
  }

  metaToModel(model, meta){
    let metaFragment = meta[this.fieldName]
    model.classList.add(metaFragment)
  }
}

var addonImageThumbnail = (node, groupName)=>{
  let imageThumbnail = new ImageThumbnail
  imageThumbnail.addon(node, groupName)
  return imageThumbnail
}

export {addonImageThumbnail}


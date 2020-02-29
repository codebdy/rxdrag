import {RXElement} from "../rxelement"
import fluidSchema from "../schemas/image/fluid"
import thumbnailSchema from "../schemas/image/thumbnail"
import figureImgSchema from "../schemas/figure/figure-img"


export class HTMLImg extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupHtml'
    this.toolboxInfo.elementId = 'htmlImg'
    this.toolboxInfo.elementName = "Img"
    this.className = 'HTMLImg'


    this.unshiftGroup({
      id:'imageOptions',
      label:'Image Options',
    })


    this.meta.tag = 'img'
    this.label = "img"

  }

  make(){
    return new HTMLImg
  }
 
  toViewModel(){
    if(this.meta.attributes.src){
      this.editMarginStyle.padding = ''
    }
    else{
      this.editMarginStyle.padding = '20px'
    }
    return super.toViewModel()
  }
 
}

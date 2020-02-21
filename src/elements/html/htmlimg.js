import {RXElement} from "../rxelement"
import {addonUtilBorder} from "../schemas/utilities/border"
import {addonUtilPadding} from "../schemas/utilities/padding"
import {addonUtilMargin} from "../schemas/utilities/margin"
import {addonImageAlt} from "../schemas/image/alt"
import {addonImageFluid} from "../schemas/image/fluid"
import {addonImageSrc} from "../schemas/image/src"
import {addonImageThumbnail} from "../schemas/image/thumbnail"
import {addonFigureImg} from "../schemas/figure/figure-img"


export class HTMLImg extends RXElement{
  constructor() {
    super()
    this.toolboxInfo.groupId = 'groupHtml'
    this.toolboxInfo.elementId = 'htmlImg'
    this.toolboxInfo.elementName = "Img"
    this.className = 'HTMLImg'


    this.groups.imageOptions = {
      label:'Image Options'
    }
    this.$meta.tag = 'img'
    this.label = "Img"

    addonImageSrc(this)
    addonImageFluid(this)
    addonImageThumbnail(this)
    addonImageAlt(this)
    addonUtilBorder(this)
    addonUtilMargin(this)
    addonUtilPadding(this)
    addonFigureImg(this, 'imageOptions')
  }

  make(){
    return new HTMLImg
  }
 
  toViewModel(){
    if(this.$meta.imageSrc){
      this.editMarginStyle.padding = ''
    }
    else{
      this.editMarginStyle.padding = '20px'
    }
    return super.toViewModel()
  }
 
}

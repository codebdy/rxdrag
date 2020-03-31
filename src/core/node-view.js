export class NodeView{
  constructor() {
  }

  render(model, parentDoment){
    this.parentDoment = parentDoment
    //this.putDown(parentDoment)//防止canvas内节点重复添加
    let oldDom = this.$dom
    
    this.$dom = document.createElement(model.tag)
    this.doRender(model, parentDoment, this.$dom)
    if(parentDoment.contains(oldDom)){
      parentDoment.replaceChild(this.$dom, oldDom)
    }
    else{
      parentDoment.appendChild(this.$dom)
    }
  }

  renderHtml(model, parentDoment){
    //this.putDown(parentDoment)//防止canvas内节点重复添加
    let previewDom = document.createElement(model.tag)
    this.doRender(model, parentDoment, previewDom)
    return previewDom
  }

  refreshState(model){
    if(this.$dom){
      //let y = this.$dom.getBoundingClientRect().y
      this.$dom.classList.remove('rx-_-mouse-overed','rx-_-focused','rx-_-dragged', 'rx-_-dragover', 'rx-_-editing')
      this.renderStylesAndClasses(model, this.$dom)
      this.showAttributes(model,this.$dom)
    }
  }

  doRender(model, parentDoment, domElement){
    domElement.innerHTML = model.innerHTML ? model.innerHTML : ''
    this.renderStylesAndClasses(model, domElement)
    this.bindEvents(domElement, model.on)
    this.showAttributes(model,domElement)
    //parentDoment.appendChild(domElement);
  }


  renderStylesAndClasses(model, domElement){
    if(domElement){
      if(model.styles){
        for(var styleName in model.styles){
          domElement.style[styleName] = model.styles[styleName]
        }
      }

      model.classList.forEach((className)=>{
        if(className){
          domElement.classList.add(className)
        }
      })
      
    }
  }

  showAttributes(model, domElement){
    for(var attributeName in model.attributes){
      if(model.attributes[attributeName]){
        domElement.setAttribute(attributeName, model.attributes[attributeName])
      }
    }
  }

  bindEvents(element, on){
    for(var eventName in on){
      //element.addEventListener(eventName, on[eventName])
      element[eventName] = on[eventName]
    }
  }

  putDown(){
    if(this.$dom){
      if(this.parentDoment.contains(this.$dom)){
        this.parentDoment.removeChild(this.$dom);
      }
    }
  }

}

import {MiniEditor} from './mini-editor'

export class NodeView{
  constructor() {
  }

  render(model, parentDoment){
    this.parentDoment = parentDoment
    this.putDown(parentDoment)
    
    this.domElement = document.createElement(model.name);
    this.doRender(model, parentDoment, this.domElement)
  }

  renderMouseFollower(model, parentDoment){
    let domElement = document.createElement(model.name);
    this.doRender(model, parentDoment, domElement)

    if(this.domElement){
      domElement.style.width = this.domElement.clientWidth + 'px'
    }

    return domElement
  }

  refreshState(model){
    if(this.domElement){
      //let y = this.domElement.getBoundingClientRect().y
      this.domElement.classList.remove('actived','focused','dragged', 'dragover')
      this.renderStylesAndClasses(model, this.domElement)
    }
  }

  refresh(model, parentDoment){
    if(!this.domElement) return;
    this.putDown()
    this.parentDoment = parentDoment
    this.doRefresh(model, parentDoment, this.domElement)
  }

  doRender(model, parentDoment, domElement){
    //if(model.contentEditable){
      //let miniEditor = new  MiniEditor(model.innerHTML)
      //miniEditor.hangOn(domElement)
      //
    //}
    domElement.innerHTML = model.innerHTML ? model.innerHTML : ''
    this.renderStylesAndClasses(model, domElement)
    this.bindEvents(domElement, model.on)
    this.showAttributes(model,domElement)
    parentDoment.appendChild(domElement);
  }

  doRefresh(model, parentDoment, domElement){
    this.renderStylesAndClasses(model, domElement)
    this.bindEvents(domElement, model.on)
    this.showAttributes(model,domElement)
    parentDoment.appendChild(domElement);
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
      domElement[attributeName] = model.attributes[attributeName]
    }
  }

  bindEvents(element, on){
    for(var eventName in on){
      //element.addEventListener(eventName, on[eventName])
      element[eventName] = on[eventName]
    }
  }

  putDown(){
    if(this.domElement){
      if(this.parentDoment.contains(this.domElement)){
        this.parentDoment.removeChild(this.domElement);
      }
    }
  }

}

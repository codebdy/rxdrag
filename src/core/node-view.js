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
    this.renderStylesAndClasses(model, domElement)
    this.bindEvents(domElement, model.on)
    this.showTextNode(model,domElement) 
    this.showLabel(model,domElement)
    this.showToolbar(model,domElement)
    this.showAttributes(model,domElement)
    parentDoment.appendChild(domElement);
  }

  doRefresh(model, parentDoment, domElement){
    this.renderStylesAndClasses(model, domElement)
    this.bindEvents(domElement, model.on)
    //this.showTextNode(model,domElement) 
    //this.showLabel(model,domElement)
    //this.showToolbar(model,domElement)
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

  showTextNode(model, domElement){
    if(model.text){
      domElement.appendChild(document.createTextNode(model.text))
    }
  }

  showLabel(model, domElement){
    if(model.label){
      let label = document.createElement('div')
      label.classList.add('element-label')
      label.title = "Can be dragged"
      label.appendChild(document.createTextNode(model.label.text))
      //this.bindEvents(label, model.label.on)
      domElement.appendChild(label)
    }
  }

  showToolbar(model, domElement){
    if(model.toolbar){
      let toolbar = document.createElement('div')
      toolbar.classList.add('element-toolbar')
      toolbar.appendChild(this.createToolbarButton('Move', 'fa-arrow-up', model.toolbar.up))
      toolbar.appendChild(this.createToolbarButton('Move', 'fa-arrows', model.toolbar.move))
      toolbar.appendChild(this.createToolbarButton('Duplicate', 'fa-copy', model.toolbar.duplicate))
      toolbar.appendChild(this.createToolbarButton('Edit', 'fa-edit', model.toolbar.edit))
      toolbar.appendChild(this.createToolbarButton('Delete', 'fa-trash-o', model.toolbar.delete))
      domElement.appendChild(toolbar)
    }
  }

  showAttributes(model, domElement){
    for(var attributeName in model.attributes){
      domElement[attributeName] = model.attributes[attributeName]
    }
  }

  createToolbarButton(title, iconName, on){
    let button = document.createElement('div')
    button.classList.add('button')
    button.title = title
    let icon = document.createElement('i')
    icon.classList.add('fa')
    icon.classList.add(iconName)

    button.appendChild(icon)
    this.bindEvents(button, on)
    return button;
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

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
    //this.showTextNode(model,domElement) 
    //this.showLabel(model,domElement)
    //this.showToolbar(model,domElement)
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
      this.label = document.createElement('div')
      this.label.classList.add('element-label')
      //this.label.title = "Can be dragged"
      this.label.appendChild(document.createTextNode(model.label.text))
      //this.bindEvents(label, model.label.on)
      domElement.appendChild(this.label)
    }
  }

  showToolbar(model, domElement){
    if(model.toolbar){
      if(!this.toolbar){
        this.toolbar = document.createElement('div')
      }
      this.toolbar.classList.add('element-toolbar')
      this.toolbar.appendChild(this.createToolbarButton('Move', 'fa-arrow-up', model.toolbar.up))
      this.toolbar.appendChild(this.createToolbarButton('Move', 'fa-arrows', model.toolbar.move))
      this.toolbar.appendChild(this.createToolbarButton('Duplicate', 'fa-copy', model.toolbar.duplicate))
      this.toolbar.appendChild(this.createToolbarButton('Edit', 'fa-edit', model.toolbar.edit))
      this.toolbar.appendChild(this.createToolbarButton('Delete', 'fa-trash-o', model.toolbar.delete))
      domElement.appendChild(this.toolbar)
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

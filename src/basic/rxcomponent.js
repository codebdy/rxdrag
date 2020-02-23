import {RXArray} from "./rxarray"

export class RXComponent{
  constructor(elementName = 'div'){
    this.children = new RXArray
    this.classList = new RXArray
    this.style = {}
    this.attrs = {}
    this.domOns = {}
    this.elementName = elementName
  }

  on(eventName, callback){
    this[eventName] = callback
    return this
  }

  off(eventName){
    delete this[eventName]
    return this
  }

  domOn(name, callback){
    if(this.$dom){
      this.$dom.addEventListener(name, callback)
    }
    this.domOns[name] = callback
    return this
  }

  domOff(name, callback){
    if(this.$dom){
      this.$dom.removeEventListener(name, callback)
    }
    delete this.domOns[name]
    return this
  }

  pushChild(child){
    this.children.push(child)
    return this
  }

  unshiftChild(child){
    this.children.unshift(child)
    return this
  }

  cssClass(className){
    this.classList.add(className)
    if(this.$dom){
      this.$dom.classList.add(className)
    }
    return this
  }

  removeCssClass(className){
    if(this.classList.contains(className)){
     this.classList.remove(className)
      if(this.$dom){
        this.$dom.classList.remove(className)
      }
    }
    return this
  }

  cssStyle(name, value){
    this.style[name] = value
    return this
  }

  removeCssStyle(name){
    delete this.style[name]
  }

  domAttr(name, value){
    this.attrs[name] = value
    return this
  }

  removeDomAttr(name){
    delete this.attrs[name]
    return this
  }

  tongle(cssClass){
    if(this.classList.contains(cssClass)){
     this.classList.remove(cssClass)
      if(this.$dom){
        this.$dom.classList.remove(cssClass)
      }
    }
    else{
     this.classList.add(cssClass)
      if(this.$dom){
        this.$dom.classList.add(cssClass)
      }
    }
  }
  //setInnerHTML(innerHTML){
  //  this.innerHTML = innerHTML
  //  return this
  //}

  render(parentElement){
    this.$dom =  document.createElement(this.elementName)
    parentElement.appendChild(this.$dom)

    if(this.innerHTML){
      this.$dom.innerHTML = this.innerHTML
    }

    for(var styleName in this.style){
      this.$dom.style[styleName] = this.style[styleName]
    }

    this.classList.forEach((className)=>{
      this.$dom.classList.add(className)
    })

    for(var attrName in this.attrs){
      this.$dom[attrName] = this.attrs[attrName]
    }

    for(var eventName in this.domOns){
      this.$dom.addEventListener(eventName, this.domOns[eventName])
    }

    this.children.forEach((child)=>{
      child.render(this.$dom)
    })
    return this
  }

  refresh(){
    if(this.$dom){
      let parentDomElement = this.$dom.parentNode
      this.destory()
      this.render(parentDomElement)
    }
  }

  setInnerHTML(innerHTML){
    this.innerHTML = innerHTML
    if(this.$dom){
      this.$dom.innerHTML = innerHTML
    }
    return this
  }

  destory(){
    this.$dom.parentNode.removeChild(this.$dom)
    this.$dom = ''
  }

  clearChild(){
    this.children = new RXArray()
  }

  show(){
    this.style.display = 'flex'
    if(this.$dom){
      this.$dom.style.display = 'flex'
    }
    return this
  }

  hide(){
    this.style.display = 'none'
    if(this.$dom){
      this.$dom.style.display = 'none'
    }
    return this
  }

  focus(){
    if(this.$dom){
      this.$dom.focus()
    }
    return this
  }

  clear(){
    if(this.$dom){
      this.$dom.value = ""
    }
    return this
  }

  insertBefore(child, refence){
    this.children.inertBefore(child, refence)
  }

}
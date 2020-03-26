import {add, contains, remove, insertBefore} from "./rxarray"

export class RXComponent{
  constructor(elementName = 'div'){
    this.children = []
    this.classList = []
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
    add(className, this.classList)
    if(this.$dom){
      this.$dom.classList.add(className)
    }
    return this
  }

  removeCssClass(className){
    if(contains(className, this.classList)){
     remove(className, this.classList)
      if(this.$dom && this.$dom.classList.contains(className)){
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
    if(contains(cssClass, this.classList)){
     remove(cssClass, this.classList)
      if(this.$dom){
        remove(cssClass, this.$dom.classList)
      }
    }
    else{
     add(cssClass, this.classList)
      if(this.$dom){
        add(cssClass, this.$dom.classList)
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

  removeChild(node){
    remove(node, this.children)
    if(this.$dom && node.$dom && this.$dom.contains(node.$dom)){
      this.$dom.removeChild(node.$dom)
    }
  }

  clearChild(){
    this.children = new RXArray()
  }

  classClasses(){
    let dom = this.$dom
    if(dom){
      this.classList.forEach(cssClass=>{
        //console.log(cssClass)
        dom.classList.remove(cssClass)
      })
    }
    this.classList.length = 0
  }

  show(){
    this.style.display = 'flex'
    if(this.$dom){
      this.$dom.style.display = 'flex'
    }
    return this
  }

  isShow(){
    return this.style.display !== 'none'
  }

  hide(){
    this.style.display = 'none'
    if(this.$dom){
      this.$dom.style.display = 'none'
    }
    return this
  }


  insertBefore(child, refence){
    insertBefore(child, refence, this.children)
  }

}
export class RXArray extends Array{
  first(){
    if(this.length > 0){
      return this[0]
    }
  }

  last(){
    if(this.length > 0){
      return this[this.length - 1]
    }
  }

  before(refence){
    for(var i = 0; i < this.length; i++){
      if(this[i] === refence && i > 0){
        return this[i - 1];
      }
    }
  }

  after(refence){
    for(var i = 0; i < this.length; i++){
      if(this[i] === refence && i < this.length){
        return this[i + 1];
      }
    }
  }


  inertBefore(child, refence){
    for(var i = 0; i < this.length; i++){
      if(this[i] === refence){
        this.splice(i, 0, child)
        return;
      }
    }
  }

  inertAfter(child, refence){
    for(var i = 0; i < this.length; i++){
      if(this[i] === refence){
        this.splice(i + 1, 0, child)
        return
      }
    }
  }

  remove(node){
    for (var i = 0; i < this.length; i++) {
      if(this[i] === node){
        this.splice(i, 1)
        break
      }
    }
  }

  add(node){
    if(!this.contains(node)){
      this.push(node)
    }
  }

  contains(node){
    for (var i = 0; i < this.length; i++) {
      if(this[i] === node){
        return true
      }
    }

    return false
  }

  tongleOnCondition(condition, node){
    if(condition){
      this.add(node)
    }
    else{
      this.remove(node)
    }
  }

}

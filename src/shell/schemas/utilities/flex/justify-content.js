var xsList = [
  'justify-content-start',
  'justify-content-end',
  'justify-content-center',
  'justify-content-between',
  'justify-content-around',
]

var smList = [
  'justify-content-sm-start',
  'justify-content-sm-end',
  'justify-content-sm-center',
  'justify-content-sm-between',
  'justify-content-sm-around',
]

var mdList = [
  'justify-content-md-start',
  'justify-content-md-end',
  'justify-content-md-center',
  'justify-content-md-between',
  'justify-content-md-around',
]

var lgList = [
  'justify-content-lg-start',
  'justify-content-lg-end',
  'justify-content-lg-center',
  'justify-content-lg-between',
  'justify-content-lg-around',
]

var xlList = [
  'justify-content-xl-start',
  'justify-content-xl-end',
  'justify-content-xl-center',
  'justify-content-xl-between',
  'justify-content-xl-around',
]

export default{
  isResponsive:true,
  label:'justify-content',
  inputName:'RxSelect',
  xs:{
    defaultValue:'',
    valueScope:xsList,
    props:{
      list:xsList,
    }
  },
  sm:{
    defaultValue:'',
    valueScope:smList,
    props:{
      list:smList,
    }
  },
  md:{
    defaultValue:'',
    valueScope:mdList,
    props:{
      list:mdList,
    }
  },
  lg:{
    defaultValue:'',
    valueScope:lgList,
    props:{
      list:lgList,
    }
  },
  xl:{
    defaultValue:'',
    valueScope:xlList,
    props:{
      list:xlList,
    }
  },

}
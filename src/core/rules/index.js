import container from "./container"
import row from "./row"
import col from "./col"
import heading from "./heading"
import commonRule from "./common-rule"

//ruleName:
// -container
// -row
// -col
// -heading

//用于判断的规则token， 全部小写，不接受大写
//Label为空，表示label使用类名字
//- label:''
//空表示所有都接受，空数组表示都不接受
//- acceptedChildren : '',
//空和空数组都表示所有都不排除
//- rejectChildren : '',
//在这个边界内算是拖入内部
//  '--responsive--' 需要根据屏幕大小被替换成 '','-sm', '-md', '-lg', '-xl'
//classes 为空表示单一类命，跟ID一致
//tags 为空表示tag，跟ID一致

export default{
  classRules : {
    "container": container,
    "row": row,
    "col": col,
    "w-100": Object.assign({}, commonRule),
    "alert" : Object.assign({}, commonRule),
  },

  tagRules : {
    heading: heading
  },
}
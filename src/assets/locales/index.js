import Vue from 'vue'
import VueI18n from 'vue-i18n'

//引入Vue-i18n
Vue.use(VueI18n)

//引入语言资源文件
const locales = {
  zh: require('./zh.json'),
  en: require('./en.json'),
}

//构建vuei18n实例，后面会export 这个实例
const i18n = new VueI18n({
  locale: getDefaultLang(),
  messages: locales,
})

//获取浏览器语言环境，截取lang的前2位字符，是因为浏览器语言返回值可能是：
//zh-cn Chinese(PRC) 
//zh-tw Chinese(Taiwan Region)
//zh-hk Chinese(Hong Kong SAR, PRC) 
//zh-sg Chinese(Singapore) 
//en-us English(United States) 
//en English
function getDefaultLang(){
  let lang = navigator.language || navigator.userLanguage
  lang = lang.substr(0, 2)
  //目前只实现两个语言版本
  if(lang !== 'zh'){
    lang = 'en'
  }
  return lang
}

//进行一些基础配置
export const setup = () => {
  let lang = getDefaultLang()

  Object.keys(locales).forEach(lang => {
    document.body.classList.remove(`lang-${lang}`)
  })
  document.body.classList.add(`lang-${lang}`)
  document.body.setAttribute('lang', lang)

  Vue.config.lang = lang
  i18n.locale = lang
}

setup()
window.i18n = i18n
export default i18n
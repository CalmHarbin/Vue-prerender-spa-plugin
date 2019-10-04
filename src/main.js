/* eslint-disable no-undef */
import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import VueWechatTitle from 'vue-wechat-title'
import utils from '@/utils/index'
//原型上绑定配置文件
import config from './config/index'
Vue.prototype.$config = config

Vue.config.productionTip = false
Vue.use(VueWechatTitle)
Vue.use(utils)

//vant组件
import {
    Swipe,
    SwipeItem,
    Lazyload,
    Toast,
    Tab,
    Tabs,
    Search,
    Icon,
    Button,
    Dialog,
    Popup,
    Field,
    Cell,
    CellGroup,
    Picker,
    DatetimePicker,
    Switch,
    RadioGroup,
    Radio
} from 'vant'
Vue.use(Swipe)
    .use(SwipeItem)
    .use(Lazyload)
    .use(Toast)
    .use(Tab)
    .use(Tabs)
    .use(Search)
    .use(Icon)
    .use(Button)
    .use(Dialog)
    .use(Popup)
    .use(Field)
    .use(Cell)
    .use(CellGroup)
    .use(Picker)
    .use(DatetimePicker)
    .use(Switch)
    .use(RadioGroup)
    .use(Radio)
Vue.prototype.$toast = Toast
Vue.prototype.$dialog = Dialog

let isLoading = false
Vue.prototype.$loading = (message = '加载中') => {
    isLoading = true
    //100毫秒内响应则不显示loading
    setTimeout(() => {
        if (isLoading) {
            Toast.loading({
                mask: true,
                duration: 0,
                message: message
            })
            isLoading = false
        }
    }, 100)
}
Vue.prototype.$loading.clear = () => {
    //最少持续500毫秒,防止一闪而过
    if (isLoading) {
        isLoading = false
        return
    }
    setTimeout(() => {
        Toast.clear()
    }, 500)
}

new Vue({
    router,
    render: h => h(App),
    mounted() {
        document.dispatchEvent(new Event('render-event'))
    }
}).$mount('#app')

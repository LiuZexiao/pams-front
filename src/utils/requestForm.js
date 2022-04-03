import axios from 'axios'
// import { MessageBox, Message } from 'element-ui'
import { ElMessage } from 'element-plus';
import router from '../router'
import NProgress from "nprogress"; //页面请求进度条
import "nprogress/nprogress.css";

// create an axios instance
const service = axios.create({
    // 后台接口地址
    baseURL:  import.meta.env.VITE_APP_URL, // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 10000 // request timeout，超过7秒提示超时
})

// request interceptor
service.interceptors.request.use(
    config => {
        // do something before request is sent
        // if (store.getters.token) {
        // if (localStorage.getItem('token')) {
        //     // let each request carry token
        //     // ['X-Token'] is a custom headers key
        //     // please modify it according to the actual situation
        //     // 修改请求头, 将Token放入请求头
        //     // config.headers['X-Token'] = getToken()
        //     config.headers['token'] = localStorage.getItem('token')
        // }
        if (localStorage.getItem('token')) {
            // let each request carry token
            // ['X-Token'] is a custom headers key
            // please modify it according to the actual situation
            // 修改请求头, 将Token放入请求头
            // config.headers['X-Token'] = getToken()
            config.headers['token'] = localStorage.getItem('token')
        }
        config.headers['Content-Type'] = "multipart/form-data"
        return config
    },
    error => {
        // do something with request error
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    /**
     * If you want to get http information such as headers or status
     * Please return  response => response
     */

    /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
    response => {
        const res = response.data
        if (res.code < 0) { //
            ElMessage.error(res.message);
            router.push("/login");
            return;
        }
        return res
    },
    error => {
        console.log('err' + error) // for debug
        ElMessage.error(error.message);
        return Promise.reject(error)
    }
)

export default service
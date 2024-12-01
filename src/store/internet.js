import axios from 'axios';

const HttpPlugin = {
    install(app) {
        // 创建一个 axios 实例
        const instance = axios.create({
            baseURL: '/api',
            timeout: 5000,  // 设置超时时间
        });

        // 你可以添加一些请求拦截器、响应拦截器等
        instance.interceptors.request.use(config => {
            return config;
        });

        instance.interceptors.response.use(
            response => response,
            error => {
                // 错误处理
                return Promise.reject(error);
            }
        );

        // 将单例实例挂载到全局属性
        app.config.globalProperties.$http = instance;
    },
};

export default HttpPlugin;

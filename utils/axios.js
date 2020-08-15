import axios from 'axios'
// import 

const instance = axios.create({
    baseURL: 'http://148.72.64.33:8080/',
});

const addAccessToken = (token) => {
    instance.interceptors.request.use(function (config) {
        if (!config.headers.Authorization) {
            config.headers.Authorization = token ? token : '';
        }
        return config;
    });
}

export { addAccessToken }

export default instance;
import axios from 'axios';
let baseUrl = 'https://www.fastmock.site/mock/987c930d39e984ff5dfa0e1248378ccf/htgl'; //  在env.dev文件中修改
const api = {
    //获取菜单
    getMenuData() {
        return axios.get(`${baseUrl}/menu`);
    },
    //获取线路
    getLineData() {
        return axios.get(`${baseUrl}/line`);
    }
}
export default api;


export function getLocalData(key) {//得到session
    let data = sessionStorage.getItem(key);
    let value = '';
    if (data) {
        value = JSON.parse(data);
        return value.data;
    } else {//调到登录页面
        return value;
    }
}
export function setLocalData(key, value) {//设置session
    sessionStorage.setItem(key, JSON.stringify({ data: value }));
}
export function removeItem(item) {
    sessionStorage.removeItem(item);
}
class Locals{       //存储单个属性
    set(key, value) {
        window.localStorage[key] = value;
    }       //读取单个属性
    get(key, defaultValue) {
        return window.localStorage[key] || (defaultValue ? defaultValue:null);
    }       //存储对象，以JSON格式存储
    setObject(key, value) {
        window.localStorage[key] = JSON.stringify(value);
    }       //读取对象
    getObject(key,value) {
        return window.localStorage[key] ? JSON.parse(window.localStorage[key]) : value;
    }
    clear() {
        window.localStorage.clear();
    }
    remove(key) {
        window.localStorage.removeItem(key);
        return "success";
    }
}
let Local = new Locals(); 
export default Local;
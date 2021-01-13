/**
 * Created by nation on 2018-03-20.
 */
function setCache(key, value){
    let storage = window.localStorage;
    storage.setItem(key, value);
}
function getCache(key){
    let storage = window.localStorage.getItem(key);
    return  storage
}
function removeCache(key){
    let storage = window.localStorage.removeItem(key);
}
function clearCache(key){
    let storage = window.localStorage.clear();
}
function setSeCache(key, value){
    let storage = window.sessionStorage;
    storage.setItem(key, value);
}
function getSeCache(key){
    let storage = window.sessionStorage.getItem(key);
    return  storage
}
function removeSeCache(key){
   window.sessionStorage.removeItem(key);
}
function clearSeCache(key){
   window.sessionStorage.clear();
}
function setArrCache(key,value){
    // 保存json
  
    let storage = window.localStorage;
    storage.setItem(key, JSON.stringify(value));
}
function getArrCache(key){
    let storage = window.localStorage.getItem(key);
    return  JSON.parse(storage)
}
function setSeArrCache(key,value){
    let storage = window.sessionStorage;
    storage.setItem(key, JSON.stringify(value));
}
function getSeArrCache(key){
    let storage = window.sessionStorage.getItem(key);
    return  JSON.parse(storage)
}
export {
    setCache,
    getCache,
    removeCache,
    clearCache,
    setSeCache,
    getSeCache,
    removeSeCache,
    clearSeCache,
    setArrCache,
    getArrCache,
    setSeArrCache,
    getSeArrCache
}

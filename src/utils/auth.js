import Cookies from 'js-cookie'

let domainName  = "";
if(window.location.href.indexOf('huaxuegroup')!==-1){
  domainName = "huaxuegroup.com";
}
const TokenKey = 'x-auth-token'
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token,{domain:domainName})
}

export function removeToken() {
  return Cookies.remove(TokenKey,{domain:domainName})
}

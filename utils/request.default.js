import { HTTP_REQUEST_URL_DEFAULT, HEADER,HEADER_DEF, TOKENNAME,apiCheck,VERSION} from '@/config/app';
import { toLogin, checkLogin } from '../libs/login';
import store from '../store';
import md5 from "../utils/md5.min";


function signatureGenerate(data,header){
    // 参数签名 密钥 + 时间戳 + header参数 + url
    // 密钥
    let secret = getApp().globalData.a;
	// random
	let nonce=Math.random().toString(36).substr(2);
    // 时间戳
    let timestamp = new Date().getTime()     
    // token
  //  let token = headers.Authorization
    // post参数
    let dataStr = serialize(sort(data))
    // 生成签名
    let str = dataStr +  secret +  timestamp  + nonce  + "md5";
    
    const sign = md5(str)
    
	header.m=timestamp;
	header.o=nonce;
    header.sign=sign;
}

// 参数排序
function sort(obj){
    if (JSON.stringify(obj) == "{}" || obj == null) {
        return {}
    }
    let key = Object.keys(obj)?.sort()
    let newObj = {}
    for (let i = 0; i < key.length; i++) {
        newObj[key[i]] = obj[key[i]]        
    }
    return newObj
}

// 参数序列化
function serialize(sortObj){
    let strJoin = ''
    for(let key in sortObj){
        strJoin += key + "=" + sortObj[key] + "&"
    }
    return strJoin
}

/**
 * 发送请求
 */
function baseRequest(url, method, data, {noAuth = false, noVerify = false})
{
  let that=this;
  let Url = apiCheck(HTTP_REQUEST_URL_DEFAULT,false), header = HEADER_DEF;
  
  
  if (!noAuth) {
    //登录过期自动登录
	if(!store.state.app.token && !checkLogin()){
		console.log('auth : ' + url)
		toLogin();
		return Promise.reject({msg:'未登陆' + url});
	}
  }
  
  if(data == undefined) data = {};
  
  if (store.state.app.token) header[TOKENNAME] = 'Bearer ' + store.state.app.token;
  
  if (store.state.app.token) data.xxl_sso_sessionid=store.state.app.token;
  
  if(VERSION) data.version=VERSION;
  
  //生成签名
  signatureGenerate(data,header);

  return new Promise((reslove, reject) => {
    uni.request({
      url: Url + '/JwebmallBi/' + url,
      method: method || 'GET',
      header: header,
      data: data || {},
      success: (res) => {
		if (res.data.code == '501')
		{
			store.commit("LOGOUT");
			let pages = getCurrentPages();
			let pageUrl=[];
			console.log('pages1111111111111111111111' );
			for (let i = 0; i < pages.length; i++) {  
						pageUrl.push(pages[i].route)  
			}  
			let loginPage = pageUrl.indexOf("pages/login/login")//聊天页面 
			if(loginPage < 0){
				uni.navigateTo({
					url: '/pages/login/login'
				})  
			}
		}
        else if (noVerify)
          reslove(res.data, res);
        else if (res.data.error_code == '1')
          reslove(res.data, res);
        else
          reject(res.data.message || '系统错误');
      },
      fail: (msg) => {
        reject('请求失败');
      }
    })
  });
}

const request = {};

['options', 'get', 'post', 'put', 'head', 'delete', 'trace', 'connect'].forEach((method) => {
  request[method] = (api, data, opt) => baseRequest(api, method, data, opt || {})
});



export default request;
import { HTTP_REQUEST_URL_DEFAULT, HEADER,HEADER_DEF, TOKENNAME,apiCheck,VERSION} from '@/config/app';
import { toLogin, checkLogin } from '../libs/login';
import store from '../store';
const cryptoJs = require('crypto-js');

const loginSecret = "ighn1gBkzBAGdwEWGRvjYG55e6PC1yWO";
const defaultSecret = "Y96VItNxY2GutI@ZDZ77sIU^!0eP2KsO";
const defaulttv = '3IPLa89}668@23)!';

function signatureGenerate(url, data,header){
    // 参数签名 密钥 + 时间戳 + header参数 + url
    // 密钥
	let secret = defaultSecret;
	if(url != "/Jwebmalladmin/login") {
		var tm1 = wx.getStorageSync('tm1');
		if(tm1&&tm1.length) {
			console.log("tm1="+tm1);
			secret = cryptoJs.MD5(defaultSecret + "_" + tm1 +"_" + defaultSecret).toString();
		}
	}
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
    
    let sign = cryptoJs.MD5(str).toString();
    
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
  
  if (store.state.app.token) header.xxl_sso_sessionid=store.state.app.token;
  
  if(VERSION) data.version=VERSION;
  
  //生成签名
  signatureGenerate(url, data,header);

  return new Promise((reslove, reject) => {
    uni.request({
      url: Url + '/JwebmallBi/' + url,
      method: 'POST',
      header: header,
      data: data || {},
      success: (res) => {
		  if(res.data != null && typeof res.data === 'string' && res.data != "" && 
		  			res.data != 'SUCCESS' && res.data != 'FAIL') {
		  			var tm = defaultSecret;
		  			var tm1 = '';
		  			var tmv = cryptoJs.enc.Utf8.parse(defaulttv);
		  			
		  			tm1 = wx.getStorageSync('tm1');
		  			var isGetTime = false;
		  			
		  			if(tm1 != null && tm1 != '' && (url != "v2/test")){
		  				var checkPassword = defaultSecret  + "_" + tm1 +"_" + defaultSecret;
						var keyx = cryptoJs.MD5(checkPassword).toString();
						var notTimek = cryptoJs.enc.Utf8.parse(keyx);
		  				try{
		  					var tmstrArr = cryptoJs.AES.decrypt(res.data, notTimek, {
		  							iv: tmv,
		  							mode: cryptoJs.mode.CBC,
		  							padding: cryptoJs.pad.Pkcs7
		  					});
		  					
		  					if(tmstrArr == null || tmstrArr.length == 0) {
		  						isGetTime = false;
		  						try {
		  							console.log('set tm1 11');
		  						    wx.setStorageSync('tm1', '');
		  						} catch (e) {    
		  						}
		  					} else {
		  						var tmstr = tmstrArr.toString(cryptoJs.enc.Utf8);
		  						res.data = JSON.parse(tmstr);
		  						isGetTime=true;
		  					}
		  				} catch(ex){
		  					console.log(ex.message);
		  					isGetTime = false;
		  					try {
		  						console.log('set tm1 12');
		  					    wx.setStorageSync('tm1', '');
		  					} catch (exx) {
		  						console.log(exx.message);
		  					}
		  				}
		  			}
		  			
		  			if(!isGetTime) {
		  				var notTimek = cryptoJs.enc.Utf8.parse(tm);
		  				try{
		  					var tmstrArr = cryptoJs.AES.decrypt(res.data, notTimek, {
		  							iv: tmv,
		  							mode: cryptoJs.mode.CBC,
		  							padding: cryptoJs.pad.Pkcs7
		  					});
		  					
		  					if(tmstrArr == null || tmstrArr.length == 0) {
		  						isGetTime = false;
		  					} else {
		  						var tmstr = tmstrArr.toString(cryptoJs.enc.Utf8);
		  						res.data = JSON.parse(tmstr);
		  						isGetTime=true;
		  					}
		  				} catch(ex){
		  				}
		  			} else {
		  			}
		  		}
				
		if (res.data.code == '501')
		{
			try {
				console.log('set tm1 14');
				wx.setStorageSync('tm1', '');
			} catch (e) {    
			}
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
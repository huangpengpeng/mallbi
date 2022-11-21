module.exports = {

	// 小程序配置
	// #ifdef MP
	// 请求域名 格式： https://您的域名
	HTTP_REQUEST_URL: `https://demo26.crmeb.net`,
	
	HTTP_REQUEST_URL_DEFAULT: `https://xstore.jwen.vip`,
	// HTTP_REQUEST_URL_DEFAULT: `http://127.0.0.1:999`,
	// 长连接 格式：wss://您的域名:20003 
	// 需要在后台设置->基础配置->WSS配置 开启WSS配置，并上传证书，重启workerman后生效
	// 请在PHP项目根目录下启动，长连接命令：sudo -u www php think workerman start --d
	// 系统默认客服端口20003,如果需要修改端口，请修改【20003】
	VUE_APP_WS_URL: `wss://demo26.crmeb.net:20003`,
	// #endif

	// H5配置
	// #ifdef H5
	//H5接口是浏览器地址，非单独部署不用修改
	HTTP_REQUEST_URL: `https://demo26.crmeb.net` || window.location.protocol + "//" + window.location.host,
	// 长连接地址，非单独部署不用修改
	// 系统默认客服端口20003,如果需要修改端口，请修改【20003】
	VUE_APP_WS_URL: `wss://demo26.crmeb.net:20003`,
	// #endif
	VERSION:`1.0.87`,
	

	// 以下配置在不做二开的前提下,不需要做任何的修改
	HEADER: {
		'content-type': 'application/json',
		//#ifdef H5
		'Form-type': navigator.userAgent.toLowerCase().indexOf("micromessenger") !== -1 ? 'wechat' : 'h5',
		//#endif
		//#ifdef MP
		'Form-type': 'routine',
		//#endif
		//#ifdef APP-VUE
		'Form-type': 'app',
		//#endif
	},
	// 以下配置在不做二开的前提下,不需要做任何的修改
	HEADER_DEF: {
		"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
		//#ifdef H5
		'Form-type': navigator.userAgent.toLowerCase().indexOf("micromessenger") !== -1 ? 'wechat' : 'h5',
		//#endif
		//#ifdef MP
		'Form-type': 'routine',
		//#endif
		//#ifdef APP-VUE
		'Form-type': 'app',
		//#endif
	},
	// 回话密钥名称 请勿修改此配置
	TOKENNAME: 'Authori-zation',
	// 缓存时间 0 永久
	EXPIRE: 0,
	//分页最多显示条数
	LIMIT: 10,
	
	apiCheck:function(url,reqPay){
		let appId='';
		// #ifdef MP
		  appId=uni.getAccountInfoSync().miniProgram.appId;
		// #endif
		if(appId == 'wxc762970bebfbb072'){
			//url='http://127.0.0.1:860/';
		  url='https://bb.51wk.cc/';
		}
		return url;
	}
}
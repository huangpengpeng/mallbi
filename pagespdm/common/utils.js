const install = (Vue, vm) => {
	/**
	 *自定义函数，全局 
	 **/
	let soma_data={
		//只实例化一次
	};
	const isLogin = () => {
		const token=vm.vuex_token
		if(!token){
			const currentPage=getCurrentPages().pop()
			const {options,route}=currentPage
			const optionsKeys=Object.keys(options)
			let params=''
			if(optionsKeys.length!==0){
				params=optionsKeys.reduce((pre,current) =>{
					return `${pre}${current}=${options[current]}&`
				},'?').slice(0,-1)
			}
			console.log(route+params)
			uni.setStorageSync("back_url",route+params)
			vm.$u.toast("请登录")
			setTimeout(() => {
				vm.$u.route({
					type:'redirect',
					url: 'pages/login/login'
				})
			}, 1500)
			return false
		}
		return true
	}





	function ifDefPlatform() {
	  let platform='';
	  //#ifdef APP-PLUS
	  platform = 'APP';
	  //#endif
	  //#ifdef H5
	  platform = 'H5';
	  //#endif
	  //#ifdef MP-WEIXIN
	  platform = 'WEIXIN';
	  //#endif
	  return platform
	}
	/**
	 *初始化APP数据 
	 **/

	var getQRParam = function (qrurl) {
		qrurl = vm.$u.trim(qrurl);
		let reg = new RegExp("^[0-9]*$");
		if (reg.test(qrurl)) {
			return qrurl;
		}
		let end = new RegExp(/\d+$/);
		end = end.exec(qrurl);
		if (end == null) {
			return '';
		} else {
			return end[0];
		}
	}
	var getDate=function(e){
		let now = new Date(new Date() - e * 24 * 60 * 60 * 1000);
		let y = now.getFullYear()
		let m = now.getMonth() + 1;
		let d = now.getDate();
		m = m < 10 ? "0" + m : m
		d = d < 10 ? "0" + d : d;
		return y + "-" + m + "-" + d
	}
	//离线文件写入（只在APP中使用）
	function writeCode(filename,code,callback) {
	  //#ifdef APP-PLUS
		plus.io.resolveLocalFileSystemURL('_documents',function(entry){
			entry.getFile(filename+'.txt',{create:true,exclusive:false},function(file){
				file.createWriter(function(writer){
					writer.seek(writer.length-1);
					writer.write(code+"\r\n");
					writer.onwrite = function(e){
						callback(1);
					}
				},function(){callback(-1);});
			},function(e){callback(-2);}
			);
		},function(e){callback(-3);});
	  //#endif
	}
	//生成离线文件名
	let createOfflineFileName=function (filetype,filename){
		var getDate=vm.$u.timeFormat(vm.timestamp, 'yyyymmdd');
		if(filetype==1){
			return "1_ZT"+getDate;
		}else if(filetype==2){
			return "2_ZJCK"+getDate;
		}else if(filetype==3){
			return "3_RK"+getDate;
		}else if(filetype==4){
			return "4_CK"+getDate;
		}else if(filetype==5){
			return "5_LXSM_"+filename;
		}else if(filetype==6){
			return "6_ZT_"+filename;
		}else if(filetype==7){
			return "7_TH_"+filename;
		}else if(filetype==8){
			return "8_XS_"+filename;
		}
		return "0_QT"+getDate;
	}

	vm.$u.utils={
		isLogin,
		ifDefPlatform,
		getQRParam,
		writeCode,
		createOfflineFileName,
		soma_data,
		getDate,
	}
}

export default {
	install
}
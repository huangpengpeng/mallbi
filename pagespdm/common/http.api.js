// /common/http.api.js

// 如果没有通过拦截器配置域名的话，可以在这里写上完整的URL(加上域名部分)
// 此处第二个参数vm，就是我们在页面使用的this，你可以通过vm获取vuex等操作，更多内容详见uView对拦截器的介绍部分：
// https://uviewui.com/js/http.html#%E4%BD%95%E8%B0%93%E8%AF%B7%E6%B1%82%E6%8B%A6%E6%88%AA%EF%BC%9F
const install = (Vue, vm) => {
	// 定义api属性
	vm.$u.api={};
	
	//登录API
	vm.$u.api.login = params => vm.$u.post('login',params);
	
	
	//组套关联
	vm.$u.api.boxcase = params => vm.$u.post('DefineBoxCase',params);
	
	vm.$u.api.boxcasequery = params => vm.$u.post('QueryDefineBoxCase',params);
	
	vm.$u.api.casebag = params => vm.$u.post('DefineCaseBag',params);
	
	vm.$u.api.casebagquery = params => vm.$u.post('QueryDefineCaseBag',params);
	
	
	//基础资料搜索或离线下载
	vm.$u.api.searchdata = params => vm.$u.post('SearchBaseData',params);
	
	//修改密码
	vm.$u.api.updatepassword = params => vm.$u.post('UpdatePassword',params);
	
	//获取最新app版本
	vm.$u.api.checkversion = () => vm.$u.post('CheckVersion'); 
	
	
	//WMS
	//扫码入库
	vm.$u.api.depositbyscan = params => vm.$u.post('DepositByScan',params);
	//撤消扫码入库
	vm.$u.api.undepositbyscan = params => vm.$u.post('UnDepositByScan',params);
	
	//扫码出库
	vm.$u.api.salesbyscan = params => vm.$u.post('SalesByScan',params);
	//撤消扫码出库
	vm.$u.api.unsalesbyscan = params => vm.$u.post('UnSalesByScan',params);
	
	//物流查询
	vm.$u.api.querylogistic = params => vm.$u.post('QueryLogistic',params);
	//轨迹追踪
	vm.$u.api.querylogisticdynamic = params => vm.$u.post('QueryLogisticDynamic',params);
	//前定义数据互查
	vm.$u.api.convertcode = params => vm.$u.post('ConvertCode',params);
	//防伪码物流码互查
	vm.$u.api.logisticsecurity = params => vm.$u.post('LogisticSecurity',params);
	
	
	//搜索调拨单
	vm.$u.api.searchallocationorder = params => vm.$u.post('SearchAllocationOrder',params);
	//按单调拨
	vm.$u.api.allocationbyorder = params => vm.$u.post('AllocationByOrder',params);


	//搜索退货订单
	vm.$u.api.searchremandorder = params => vm.$u.post('SearchRemandOrder',params);
	
	
	//搜索销售单
	vm.$u.api.searchsellorder = params => vm.$u.post('SearchSellOrder',params);
	
	
	//按单退货
	vm.$u.api.remandbyorder = params => vm.$u.post('RemandByOrder',params);

	//直接出库
	vm.$u.api.directsalesbyscan = params => vm.$u.post('DirectSalesByScan',params);
	
	
	//按销售单发货
	vm.$u.api.sellorderscan = params => vm.$u.post('SellOrderScan',params);
	
	//清除编码
	vm.$u.api.clearcodebyscan = params => vm.$u.post('ClearCodeByScan',params);

	
	//加载数据
	vm.$u.api.datalist = params => vm.$u.post('DataList',params);
	//数据字典管理
	vm.$u.api.parameter = params => vm.$u.post('Parameter',params);
	
	//商品管理
	vm.$u.api.product = params => vm.$u.post('Product',params);
	//仓库管理
	vm.$u.api.depot = params => vm.$u.post('Depot',params);
	
	//客户管理
	vm.$u.api.dealer = params => vm.$u.post('Dealer',params);
	//出库统计
	vm.$u.api.statlogistics = params => vm.$u.post('StatisticsLogistics',params);
	
	//后定义二级组套打印（返回箱码）
	vm.$u.api.boxcaseprint = params => vm.$u.post('OnceBoxJoinCasePrint',params);
	
	//判断当前编码是否存在(code,codetype)
	//codetype为1则判断box是否存在于T_Base_DefinedCode
	vm.$u.api.isexistscode = params => vm.$u.post('IsExistsCode',params);
	//验证当前编码是否有效
	vm.$u.api.validcode = params => vm.$u.post('ValidCode',params);
	
	//保存当前用户对app端config的配置
	vm.$u.api.saveconfig = params => vm.$u.post('SaveUserAppConfig',params);
	
	//代理客户端--扫码发货
	vm.$u.api.proxysalescode = params => vm.$u.post('ProxySalesCode',params);
	
	//代理客户端--扫码退货
	vm.$u.api.proxyremandcode = params => vm.$u.post('ProxyRemandCode',params);

	//企业端-退货订单管理
	vm.$u.api.remandorder = params => vm.$u.post('RemandOrder',params);
	
	//企业端-调拨订单管理
	vm.$u.api.allocationorder = params => vm.$u.post('AllocationOrder',params);
	
	
	//验证设备是否激活
	vm.$u.api.appregister = params => vm.$u.post('AppRegister',params);
	
	//获取物流配置信息
	vm.$u.api.logisticconfig = () => vm.$u.post('LogisticConfig'); 
	// vm.$u.api.index = (params = {}) => vm.$u.get('/api/index',params);
	// vm.$u.api.authOssToken = () => vm.$u.get('/api/auth/oss/token');  
	
	// vm.$u.api.updateUserInfo= params => vm.$u.put('/api/user',params);
	// vm.$u.api.authLogout = () => vm.$u.post('/api/auth/logout'); 
}

export default {
	install
}
// +---------------------------------------------------------------------
// | CRMEB [ CRMEB赋能开发者，助力企业发展 ]
// +---------------------------------------------------------------------
// | Copyright (c) 2016~2021 https://www.crmeb.com All rights reserved.
// +---------------------------------------------------------------------
// | Licensed CRMEB并不是自由软件，未经许可不能去掉CRMEB相关版权
// +---------------------------------------------------------------------
// | Author: CRMEB Team <admin@crmeb.com>
// +---------------------------------------------------------------------

export default {
	namespaced: true,
	state: {
		// 搜索关键字
		hotWord: [],
		nameIndex: ''
	},
	getters: {},
	mutations: {
		setHotWord(state, hotWordList) {
			state.hotWord = hotWordList;
		},
		setnameIndex(state, data){
			console.log('kkkkkkkkkkkjjjj',data);
			state.nameIndex = data;
		}
	}
}

import requestDef from "@/utils/request.default.js";
import Cache from '../utils/cache';
import Routine from '@/libs/routine';

import {
	HTTP_REQUEST_URL_DEFAULT,
	HEADER,
	HEADER_DEF,
	TOKENNAME,
	apiCheck
} from '@/config/app';
import {
	LOGIN_STATUS,
	USER_INFO,
	EXPIRES_TIME,
	STATE_R_KEY
} from './../config/cache';

/**
 * 报表登录
 * @param data 
 */
export function loginMobileCode(data) {
	return requestDef.post("/login", data, {
		noAuth: true
	});
}



export function GoodsPayPrice(data) {
	return requestDef.post("bi/goodsPayPrice", data,{
	
	});
}



export function UserPayPrice(data) {
	return requestDef.post("bi/UserPayPrice", data,{
	});
}



export function UserGoodsPayPrice(data) {
	return requestDef.post("bi/UserGoodsPayPrice", data,{
	});
}




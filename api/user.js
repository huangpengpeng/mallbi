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


/**
 * 日维度积分汇总
 * @param data 
 */
export function DayScoreTotal(data) {
	return requestDef.get("bi/dayScoreTotal", data,{
	
	});
}



/**
 * 各团队每日积分明细
 * @param data 
 */
export function DayScoreTeamTotal(data) {
	return requestDef.get("bi/dayScoreTeamTotal", data,{
	
	});
}

/**
 * 各团队每日新增创客数量
 * @param data 
 */
export function DayNumberTeam(data) {
	return requestDef.get("bi/dayNumberTeam", data,{
	
	});
}


/**
 * 每日订单积分明细
 * @param data 
 */
export function DayOrderNumberScoreInfo(data) {
	return requestDef.get("bi/dayOrderNumberScoreInfo", data,{
	
	});
}


/**
 * 每日订单积分占比
 * @param data 
 */
export function DayOrderNumberScoreAccount(data) {
	return requestDef.get("bi/dayOrderNumberScoreAccount", data,{
	
	});
}



/**
 * 业绩报表
 * @param data 
 */
export function AmountReport(data) {
	return requestDef.get("bi/amountReport", data,{
	
	});
}
/**
 * 星级报表
 * @param data 
 */
export function CapaReport(data) {
	return requestDef.get("bi/capaReport", data,{
	
	});
}



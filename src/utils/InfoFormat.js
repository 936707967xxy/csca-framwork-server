//身份证号码打码
export function formatIdCard(data) {
	return data.substring(0, 3) + "************" + data.substring(15, 18);
};
//手机号码打码
export function formatPhone(data) {
	return data.substring(0, 3) + "****" + data.substring(7, 11);
};
//划扣状态表示转文字 ---	// 划扣状态（成功：0，失败：-1，待定：2）
export function formatDeductState(data) {
	var fmt = "";
	if(data == "0") {
		fmt = "划扣成功";
	} else if(data == "-1") {
		fmt = "划扣失败";

	} else if(data == "2") {
		fmt = "待查证";
	}
	return fmt;
	
};
//划扣类型表示转文字 ---	// 	// 划扣记录类型(0,正常月还，1正常提前，2逾期月还，3逾期提前)
export function formatDeductRecordType(data) {
	var fmat = "";
	if(data == "0"){
		fmat = "正常月还";
	}else if (data == "1"){
		fmat = "正常提前";		
	}else if(data == "2"){
		fmat = "逾期月还";		
	}else if (data == "3"){
		fmat = "逾期提前";		
	}
	return fmat;
};
//减免审批描述格式化
export function formatApplicationDesc(data){
	if(data.length > 7){
		return data.substring(0,7) + "……";
	}
}

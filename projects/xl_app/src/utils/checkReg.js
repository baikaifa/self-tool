function checkPhone(val) {
	let reg1 = /^1[3-9]/;
	let reg2 = /^\d+$/;
	let reg3 = /^\s+|\s+$/g;
	let value = val.replace(reg3, '');
	let len = value.length;
	if (!reg2.test(value)) {
		value = value.substring(0, len - 1);
		return value;
	}
	if (len == 1 && value != 1) {
		return '';
	}
	if (len == 2 && !reg1.test(value)) {
		value = value.substring(0, len - 1);
		return value;
	}
	if (len > 11) {
		value = value.substring(0, 11);
		return value;
	}
	return value;
}
function checkCode(val, leng) {
	let reg2 = /^\d+$/;
	let reg3 = /^\s+|\s+$/g;
	let value = val.replace(reg3, '');
	let len = value.length;
	if (!reg2.test(value)) {
		value = value.replace(/\D+/g, '');
		return value;
	}
	if (!leng) {
		leng = 6;
	}
	if (len > leng) {
		value = value.substring(0, leng);
		return value;
	}
	return value;
}
function checkPsw(val) {
	let info = {
		flag: true,
		msg: ''
	};
	let numReg = /^\d+$/;
	let lowerReg = /^[a-z]{1,}$/;
	let upperReg = /^[A-Z]{1,}$/;
	let reg3 = /^\s+|\s+$/g;
	let value = val.replace(reg3, '');
	let len = value.length;
	if (len < 6 || len > 20) {
		info = {
			msg: "密码必须在6-20位数字和字母或字符之间",
			flag: false
		}
		return info;
	}
	if (numReg.test(value) || lowerReg.test(value) || upperReg.test(value)) {
		info = {
			msg: "密码必须在6-20位数字和字母或字符之间",
			flag: false
		}
		return info;
	}
	return info;
}
function checkSpace(val) {
	let reg3 = /^\s+|\s+$/g;
	let value = val.replace(reg3, '');
	return value;
}
/**
 * 验证
 */
export const check = {
	phone: checkPhone,
	code: checkCode,
	password: checkPsw,
	space: checkSpace,
}
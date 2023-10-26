// 将价格初始化："分" => "元"
export function priceFormat(num) {
	return (num / 100).toFixed(2)
}

// 输出折扣
export function discount(num1, num2) {
	// num2：原价,   num1：现价
	return parseInt(num1 / num2 * 10)
}
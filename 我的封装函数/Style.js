/* 当css的参数个数小于3，获取否则 设置 */
function css(el,attr,val) {
	if(arguments.length < 3) {  //如果小于3 说明只有el,attr两个
		var val  = 0;
		if(el.currentStyle) {   //IE下识别 解决兼容性
			val = el.currentStyle[attr];
		} else {
			val = getComputedStyle(el)[attr]; //否则chrome下识别
		}
		if(attr == "opacity") {		 //如果获取的是opacity 避免小数计算 放大100倍
			val*=100;
		}
		return parseFloat(val);		 // 返回val值
	}
	if(attr == "opacity") {	 //如果获取的是opacity
		el.style.opacity = val/100; //否则chrome下识别
		el.style.filter = "alpha(opacity = "+val+")";  //IE下识别 解决兼容性
	} else {
		el.style[attr] = val + "px";  //否则其他属性值加单位
	}
}
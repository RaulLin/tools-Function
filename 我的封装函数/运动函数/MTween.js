function getId(name){
			return document.getElementById(name);
}
function getTag(parent,tag){
	return parent.getElementsByTagName(tag);
}
function getClass(parent,name){
	return parent.getElementsByClassName(name);
}
/*
	t: 执行至 第几次
	b: 起始值
	c: 差值(目标点和起始值的差值)
	d: 执行总次数

	return 本次应该在的位置
*/

var Tween = {
	linear: function (t, b, c, d){
		return c*t/d + b;		//匀速变化
	},
	easeIn: function(t, b, c, d){
		return c*(t/=d)*t + b;		//加速变化
	},
	easeOut: function(t, b, c, d){
		return -c *(t/=d)*(t-2) + b;		//减速变化
	},
	easeBoth: function(t, b, c, d){		//先加后减
		if ((t/=d/2) < 1) {
			return c/2*t*t + b;	
		}
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInStrong: function(t, b, c, d){		//二次方加速
		return c*(t/=d)*t*t*t + b;	
	},
	easeOutStrong: function(t, b, c, d){	//二次方减速
		return -c * ((t=t/d-1)*t*t*t - 1) + b;	
	},
	easeBothStrong: function(t, b, c, d){	//二次方先加后减
		if ((t/=d/2) < 1) {    
			return c/2*t*t*t*t + b;
		}
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	elasticIn: function(t, b, c, d, a, p){		//弹性在开始方向
		if (t === 0) { 
			return b; 
		}
		if ( (t /= d) == 1 ) {
			return b+c; 
		}
		if (!p) {
			p=d*0.3; 
		}
		if (!a || a < Math.abs(c)) {
			a = c; 
			var s = p/4;
		} else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	elasticOut: function(t, b, c, d, a, p){		//弹性在结束方向
		if (t === 0) {
			return b;
		}
		if ( (t /= d) == 1 ) {
			return b+c;
		}
		if (!p) {
			p=d*0.3;
		}
		if (!a || a < Math.abs(c)) {
			a = c;
			var s = p / 4;
		} else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},    
	elasticBoth: function(t, b, c, d, a, p){		//弹性在开始和结束方向都有
		if (t === 0) {
			return b;
		}
		if ( (t /= d/2) == 2 ) {
			return b+c;
		}
		if (!p) {
			p = d*(0.3*1.5);
		}
		if ( !a || a < Math.abs(c) ) {
			a = c; 
			var s = p/4;
		}
		else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		if (t < 1) {
			return - 0.5*(a*Math.pow(2,10*(t-=1)) * 
					Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		}
		return a*Math.pow(2,-10*(t-=1)) * 
				Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
	},
	backIn: function(t, b, c, d, s){		//回弹在开始方向
		if (typeof s == 'undefined') {
		   s = 1.70158;
		}
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	backOut: function(t, b, c, d, s){		//回弹在结束方向
		if (typeof s == 'undefined') {
			s = 2.70158;  		//回缩的距离
		}
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	}, 
	backBoth: function(t, b, c, d, s){		//回弹在开始和结束方向都有
		if (typeof s == 'undefined') {
			s = 1.70158; 
		}
		if ((t /= d/2 ) < 1) {
			return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		}
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	bounceIn: function(t, b, c, d){			//碰撞在开始方向
		return c - Tween['bounceOut'](d-t, 0, c, d) + b;
	},       
	bounceOut: function(t, b, c, d){		//碰撞在结束方向
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
		}
		return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
	},      
	bounceBoth: function(t, b, c, d){	//碰撞在开始和结束都有
		if (t < d/2) {
			return Tween['bounceIn'](t*2, 0, c, d) * 0.5 + b;
		}
		return Tween['bounceOut'](t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
	}
};

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
function mTween(el,attr,target,time,type) {
	var t = 0;    			  //  t: 执行至 第几次
	var b = css(el,attr);    //	b: 起始值
	var c = target - b;     //	c: 差值(目标点和起始值的差值)
	var d = time/20;       //	d: 执行总次数
	clearInterval(el.timer);   //清除定时器
	el.timer = setInterval(function(){
		t++; 
		if(t > d) {      //如果执行次数到达总次数 
			clearInterval(el.timer);   //清除定时器
		} else {
			var val = Tween[type](t,b,c,d);  //调用动画执行函数
			css(el,attr,val);
		}
	},20);							//间隔时间20ms
}
/*
	t: 执行至 第几次
	b: 起始值
	c: 差值(目标点和起始值的差值)
	d: 执行总次数

	return 本次应该在的位置
*/